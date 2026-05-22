import('@heroui/react').then(heroui => {
  console.log('Exports:', Object.keys(heroui).filter(k => k.toLowerCase().includes('modal')));
}).catch(err => {
  console.error(err);
});
