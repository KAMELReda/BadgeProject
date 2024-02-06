// Checks if the pixel's position is within the specified circle
function isInCircle(x, y, centerX, centerY, radius) {
    const dx = x - centerX;
    const dy = y - centerY;
    return (dx * dx + dy * dy) <= (radius * radius);
}

//the color of happiness
function isHappyYellow(r, g, b) {
    return r > 100 && g > 100 && b < 50;
}
  
// Verifies the image size and pixels
async function verifyImage(file) {return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
  
    if (canvas.width !== 512 || canvas.height !== 512) {
        reject('Image size is not 512x512.');
        return;
    }
  
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    let happyYellowCount = 0;
    pixelNonTransparentCount = 0;//No of non-transparent pixels outside the circle
    const totalPixels = canvas.width * canvas.height;
  
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            if (isHappyYellow(r, g, b)) {
                happyYellowCount++;
            }
            const alpha = data[index + 3];
            console.log('alpha: '+ alpha)
            if (alpha == 0 && isInCircle(x, y, centerX, centerY, radius)) {
              pixelNonTransparentCount++;  
            }
          }
        }
        if (happyYellowCount / totalPixels < 0.18) { // Threshold for "happy" yellow presence
            console.log(happyYellowCount/totalPixels );
            reject('Image does not contain enough "happy" yellow color.');
            return;
          }
        if(pixelNonTransparentCount != 0){
          reject('Image contains non-transparent pixels outside the circle.');
          return;
        }
    
        resolve('Image verified successfully.');
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
  