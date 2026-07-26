const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Replace the block of imports for Home with HomePage, GlobalSidebars, and seoMeta
content = content.replace(
  /import HeroSection[\s\S]*?import HomeBlogsSection from "\.\/components\/home\/HomeBlogsSection";/,
  `import HomePage from "./app/(marketing)/page";
import GlobalSocialSidebar from "./components/ui/GlobalSocialSidebar";
import GlobalTrafficSidebar from "./components/ui/GlobalTrafficSidebar";
import { defaultTitles, defaultDescs } from "./utils/seoMeta";`
);

// 2. Remove the definitions of HomePage, GlobalSocialSidebar, GlobalTrafficSidebar
content = content.replace(
  /\/\* HOME PAGE \*\/[\s\S]*?function App\(\) \{/,
  'function App() {'
);

// 3. Remove defaultTitles and defaultDescs definitions
content = content.replace(
  /const defaultTitles = \{[\s\S]*?const metaTitle = siteContents/m,
  'const metaTitle = siteContents'
);

// 4. Remove Icon import since it's not used in App anymore
content = content.replace(
  /import Icon from "\.\/utils\/Icon";\r?\n/,
  ''
);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx refactored');
