import * as jahiaComponents from './components';
import * as jahiaLayouts from './layouts';
import * as jahiaViews from './views';
import * as jahiaTemplates from './templates';
import {registerJahiaComponents} from '@jahia/js-server-engine';
// Import './scss/styles.scss';

registerJahiaComponents(jahiaComponents);
registerJahiaComponents(jahiaLayouts);
registerJahiaComponents(jahiaViews);
registerJahiaComponents(jahiaTemplates);
