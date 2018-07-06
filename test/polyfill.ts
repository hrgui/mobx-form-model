import * as enzyme from 'enzyme';
import 'raf/polyfill';
import * as Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
enzyme.configure({ adapter: new Adapter() });
