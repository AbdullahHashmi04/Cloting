from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
from werkzeug.utils import secure_filename
from inference import initialize_model, process_tryon

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
CHECKPOINT_PATH_ALIAS = './VITON-HD/checkpoints/alias_final.pth'
CHECKPOINT_PATH_GMM = './VITON-HD/checkpoints/gmm_final.pth'
CHECKPOINT_PATH_SEG = './VITON-HD/checkpoints/seg_final.pth'

# Create necessary folders
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, 'person'), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, 'cloth'), exist_ok=True)

# Initialize model on startup
print("Loading VITON-HD model...")
initialize_model(CHECKPOINT_PATH_ALIAS, CHECKPOINT_PATH_GMM, CHECKPOINT_PATH_SEG)
print("Model loaded successfully!")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model': 'loaded'})

@app.route('/api/tryon', methods=['POST'])
def virtual_tryon():
    try:
        # Check if files are present
        if 'person' not in request.files or 'cloth' not in request.files:
            return jsonify({'error': 'Both person and cloth images required'}), 400
        
        person_file = request.files['person']
        cloth_file = request.files['cloth']
        
        # Validate files
        if person_file.filename == '' or cloth_file.filename == '':
            return jsonify({'error': 'No selected files'}), 400
        
        if not (allowed_file(person_file.filename) and allowed_file(cloth_file.filename)):
            return jsonify({'error': 'Invalid file type. Use PNG, JPG, or JPEG'}), 400
        
        # Generate unique IDs
        request_id = str(uuid.uuid4())
        
        # Save uploaded files
        person_filename = f"{request_id}_person.jpg"
        cloth_filename = f"{request_id}_cloth.jpg"
        output_filename = f"{request_id}_result.jpg"
        
        person_path = os.path.join(UPLOAD_FOLDER, 'person', person_filename)
        cloth_path = os.path.join(UPLOAD_FOLDER, 'cloth', cloth_filename)
        output_path = os.path.join(OUTPUT_FOLDER, output_filename)
        
        person_file.save(person_path)
        cloth_file.save(cloth_path)
        
        # Process virtual try-on
        result_path = process_tryon(person_path, cloth_path, output_path)
        
        # Return result
        return jsonify({
            'success': True,
            'request_id': request_id,
            'output_url': f'/api/result/{output_filename}'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/result/<filename>', methods=['GET'])
def get_result(filename):
    try:
        file_path = os.path.join(OUTPUT_FOLDER, filename)
        if os.path.exists(file_path):
            return send_file(file_path, mimetype='image/jpeg')
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
