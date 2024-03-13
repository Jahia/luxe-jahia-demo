import * as jahiaViews from './views';
import * as jahiaTemplates from './templates';
import {registerJahiaComponents} from '@jahia/js-server-engine';
// Import './scss/styles.scss';

// import i18next from 'i18next';
// i18next.loadNamespaces('luxe-jahia-demo');
// i18next.loadLanguages(locale.getLanguage());

registerJahiaComponents(jahiaViews);
registerJahiaComponents(jahiaTemplates);
