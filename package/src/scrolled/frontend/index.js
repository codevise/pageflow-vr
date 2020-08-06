import {frontend} from 'pageflow-scrolled/frontend';
import {VrView} from './VrView';

frontend.contentElementTypes.register('vrImage', {
  component: VrView,
  lifecycle: true
});
