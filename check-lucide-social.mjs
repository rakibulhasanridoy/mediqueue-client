import('lucide-react').then(lucide => {
  const keys = Object.keys(lucide);
  console.log('Facebook:', keys.includes('Facebook'));
  console.log('Github:', keys.includes('Github'));
  console.log('Linkedin:', keys.includes('Linkedin'));
  console.log('Twitter:', keys.includes('Twitter'));
  console.log('X:', keys.includes('X'));
  console.log('Send:', keys.includes('Send'));
  console.log('Brand keys:', keys.filter(k => k.length <= 3));
}).catch(err => {
  console.error(err);
});
