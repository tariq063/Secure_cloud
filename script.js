document.getElementById('uploadButton').onclick = async () => {
    const fileInput = document.getElementById('fileUpload');
    if (!fileInput.files[0]) {
        alert('Please select a file!');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();
    alert(`File uploaded successfully! Your key: ${result.key}`);
};

document.getElementById('downloadButton').onclick = async () => {
    const key = document.getElementById('keyInput').value;
    if (!key) {
        alert('Please enter your decryption key!');
        return;
    }

    const response = await fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
    });

    if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'decrypted-file';
        link.click();
    } else {
        alert('Invalid key or file not found!');
    }
};
