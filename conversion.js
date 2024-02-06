function convertToCircleAvatar(file, callback) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 512;
  
      // Draw circle mask
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
      ctx.clip();
  
      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
      // Convert canvas to PNG
      canvas.toBlob((blob) => {callback(blob);}, 'image/png');
    };
    img.src = URL.createObjectURL(file);
  }
  