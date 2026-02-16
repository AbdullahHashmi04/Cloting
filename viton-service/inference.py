import torch
import cv2
import numpy as np
from PIL import Image
import os
import sys

# Ensure the VITON-HD directory is in the sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'VITON-HD'))  # Add VITON-HD to sys.path

# Import the models from the VITON-HD directory
from networks import SegGenerator, GMM, ALIASGenerator  # These classes are inside networks.py
from utils.transforms import transform_image  # This function is inside utils.py

class Config:
    def __init__(self):
        self.image_size = (512, 384)  # Image size
        self.device = "cuda" if torch.cuda.is_available() else "cpu"  # Use GPU if available
        self.ngf = 64  # Number of filters in the generator
        self.num_upsampling_layers = "most"  # Number of upsampling layers
        
        # Add missing parameters for model initialization
        self.init_type = 'normal'  # Normal initialization
        self.init_variance = 0.02  # Initialize variance for weights
        
        # Set image dimensions as load_width and load_height
        self.load_width = self.image_size[0]
        self.load_height = self.image_size[1]
        
        # Add grid_size
        self.grid_size = 8  # This should be an integer, not a tuple
        
        # Add norm_G for generator normalization
        self.norm_G = 'batch'  # Options might be 'batch', 'instance', or 'none'
        
        # Add semantic_nc for semantic segmentation channels
        self.semantic_nc = 20  # Typically 20 for VITON-HD, can adjust if necessary
        
        # Add norm_type for normalization in the ALIASNorm class
        self.norm_type = 'aliasbatch'  # Must start with 'alias', adjust if needed

        # Other model-related configurations (adjust as necessary)
        self.batch_size = 16  # Example: Define the batch size
        self.lr = 0.0002  # Example: Learning rate, if required in the model initialization
        self.num_epochs = 100  # Example: Number of epochs, if required

class VITONInference:
    def __init__(self, alias_checkpoint, gmm_checkpoint, seg_checkpoint, device='cuda'):
        self.device = torch.device(device if torch.cuda.is_available() else 'cpu')
        self.config = Config()  # Create config object
        self.load_models(alias_checkpoint, gmm_checkpoint, seg_checkpoint)

    def load_models(self, alias_checkpoint, gmm_checkpoint, seg_checkpoint):
        """Load pre-trained models"""
        self.seg_model = SegGenerator(opt=self.config, input_nc=3, output_nc=20)
        self.gmm_model = GMM(opt=self.config, inputA_nc=4, inputB_nc=3)
        self.alias_model = ALIASGenerator(opt=self.config, input_nc=6)

        # Load checkpoints from provided paths
        self.seg_model.load_state_dict(torch.load(seg_checkpoint, map_location=self.device))
        self.gmm_model.load_state_dict(torch.load(gmm_checkpoint, map_location=self.device))
        self.alias_model.load_state_dict(torch.load(alias_checkpoint, map_location=self.device))
        
        # Set models to evaluation mode
        self.seg_model.eval()
        self.gmm_model.eval()
        self.alias_model.eval()
        
        # Move models to device (GPU or CPU)
        self.seg_model.to(self.device)
        self.gmm_model.to(self.device)
        self.alias_model.to(self.device)

    def preprocess_images(self, person_img_path, cloth_img_path):
        """Preprocess person and cloth images"""
        try:
            # Load images
            person_img = Image.open(person_img_path).convert('RGB')
            cloth_img = Image.open(cloth_img_path).convert('RGB')
        except Exception as e:
            raise ValueError(f"Error loading images: {e}")

        # Resize to 512x384 (VITON-HD default)
        person_img = person_img.resize(self.config.image_size, Image.BICUBIC)
        cloth_img = cloth_img.resize(self.config.image_size, Image.BICUBIC)

        # Transform to tensors
        person_tensor = transform_image(person_img)
        cloth_tensor = transform_image(cloth_img)

        return person_tensor, cloth_tensor

    def run_inference(self, person_img_path, cloth_img_path, output_path):
        """Run virtual try-on inference"""
        with torch.no_grad():
            # Preprocess
            person, cloth = self.preprocess_images(person_img_path, cloth_img_path)
            person = person.unsqueeze(0).to(self.device)
            cloth = cloth.unsqueeze(0).to(self.device)

            # Step 1: Segmentation
            seg_out = self.seg_model(person)

            # Step 2: Geometric Matching
            warped_cloth = self.gmm_model(cloth, person, seg_out)

            # Step 3: Final Generation
            output = self.alias_model(person, warped_cloth, seg_out)

            # Post-process and save
            output_img = self.tensor_to_image(output[0])
            output_img.save(output_path)

            return output_path

    def tensor_to_image(self, tensor):
        """Convert tensor to PIL Image"""
        # Denormalize
        tensor = (tensor + 1) / 2.0
        tensor = tensor.clamp(0, 1)

        # Convert to numpy
        img_np = tensor.cpu().numpy().transpose(1, 2, 0)
        img_np = (img_np * 255).astype(np.uint8)

        return Image.fromarray(img_np)

# Global model instance
viton_model = None

def initialize_model(alias_checkpoint, gmm_checkpoint, seg_checkpoint):
    global viton_model
    viton_model = VITONInference(alias_checkpoint, gmm_checkpoint, seg_checkpoint)
    return viton_model

def process_tryon(person_path, cloth_path, output_path):
    if viton_model is None:
        raise Exception("Model not initialized")
    return viton_model.run_inference(person_path, cloth_path, output_path)
