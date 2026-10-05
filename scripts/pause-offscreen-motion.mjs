import {readFile,writeFile} from 'node:fs/promises';
let app=await readFile('src/App.jsx','utf8');
app=app.replace('function chooseDestination(name, interest)', `useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('ambient-outside', !entry.isIntersecting)));
    document.querySelectorAll('.dreamy-hero, .final-adventure').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  function chooseDestination(name, interest)`);
await writeFile('src/App.jsx',app);
