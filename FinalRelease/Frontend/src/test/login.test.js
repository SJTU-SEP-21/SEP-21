import React from 'react';
import Loginform from "../component/loginform";
import {mount} from "enzyme";

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

describe('login Test',()=>{
    describe('render Test', () => {
        let outLayer;
        let usernameInput;
        let passwordInput;
        let submitButton;
        let checkboxButton;
        beforeEach(() => {
            outLayer = mount(<Loginform />);
            usernameInput = outLayer.find('input[id="username"]' );
            passwordInput = outLayer.find('input[type="password"]');
            checkboxButton = outLayer.find('Checkbox');
            submitButton = outLayer.find('Button[htmlType="submit"]');
        });
        afterEach(() => {
            outLayer.unmount()
        });

        it('should render successfully', () => {
            expect(outLayer.exists()).toBe(true);
            expect(usernameInput.exists()).toBe(true);
            expect(passwordInput.exists()).toBe(true);
            expect(checkboxButton.exists()).toBe(true);
            expect(submitButton.exists()).toBe(true);
        })
        describe('input test',() =>{
            const outLayer =mount(<Loginform />);
            it('usernameinput1',()=>{
                outLayer.find('input[id="username"]').simulate('change',{target:{value:'xiaoming'}});
                expect(outLayer.find('input[id="username"]').prop('value')).toBe("xiaoming");
            })

            it('usernameinput2',()=>{
                outLayer.find('input[id="username"]').simulate('change',{target:{value:'XM123'}});
                expect(outLayer.find('input[id="username"]').prop('value')).toBe("XM123");
            })

            it('passwordinput1',()=>{
                outLayer.find('input[type="password"]').simulate('change',{target:{value:'123456'}});
                expect(outLayer.find('input[type="password"]').prop('value')).toBe("123456");
            })
            it('passwordinpu2t',()=>{
                outLayer.find('input[type="password"]').simulate('change',{target:{value:'asd123'}});
                expect(outLayer.find('input[type="password"]').prop('value')).toBe("asd123");
            })
        });

    })
})