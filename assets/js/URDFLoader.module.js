import * as URDFLoaderUMD from './URDFLoader.js';

// Assuming URDFLoader is attached to the global object in UMD format.
const URDFLoader = URDFLoaderUMD.URDFLoader || window.URDFLoader;
export { URDFLoader };
