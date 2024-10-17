document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const imagePreview = document.getElementById('imagePreview');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        try {
            const response = await fetch('http://localhost:5000/api/v1/service/upload-image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.startsWith('image/')) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                imagePreview.src = imageUrl;
                imagePreview.style.display = 'block';
                messageDiv.textContent = 'Image uploaded successfully!';
            } else {
                const data = await response.json();
                messageDiv.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            messageDiv.textContent = `Error: ${error.message}`;
        }
    });
});