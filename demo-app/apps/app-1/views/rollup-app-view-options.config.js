import merge from 'deepmerge';
// use createSpaConfig for bundling a Single Page App
import { createSpaConfig } from '@open-wc/building-rollup';

// use createBasicConfig to do regular JS to JS bundling
// import { createBasicConfig } from '@open-wc/building-rollup';

const inFile = './demo-app/apps/app-1/views/app-1-view-options.html';
const outDir = 'dist-app/apps/app-1/views';

const baseConfig = createSpaConfig({
    // use the outputdir option to modify where files are output
    outputDir: outDir,

    // if you need to support older browsers, such as IE11, set the legacyBuild
    // option to generate an additional build just for this browser
    // legacyBuild: true,

    // development mode creates a non-minified build for debugging or development
    developmentMode: process.env.ROLLUP_WATCH === 'true',

    // set to true to inject the service worker registration into your index.html
    injectServiceWorker: false,

});

export default merge(baseConfig, {
    // if you use createSpaConfig, you can use your index.html as entrypoint,
    // any <script type="module"> inside will be bundled by rollup
    //input: ['./demo-app/index.html'],
    input: inFile,

    // alternatively, you can use your JS as entrypoint for rollup and
    // optionally set a HTML template manually
    // input: './app.js',

});