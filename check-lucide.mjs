import('lucide-react').then(lucide => {
  console.log('Twitter keys:', Object.keys(lucide).filter(k => k.toLowerCase().includes('twitter')));
}).catch(err => {
  console.error(err);
});
