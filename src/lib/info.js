export function createInfo(msg) {
    const createdData = document.createElement('div');
    createdData.textContent = msg;
    createdData.className = 'info';
    
    document.body.appendChild(createdData);
    setTimeout(() => createdData.remove(), 5000);
  }