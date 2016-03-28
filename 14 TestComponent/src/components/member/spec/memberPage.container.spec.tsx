import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as React from 'react';
import configureStore = require('redux-mock-store');
import MemberPageContainer from '../memberPage.container';
import MemberEntity from '../../../api/memberEntity';
import MemberErrors from '../../../validations/memberFormErrors';
import * as initializeMemberActions from '../../../actions/initializeNewMember';
import * as loadMemberActions from '../../../actions/loadMember';
import * as uiInputMemberActions from '../../../actions/uiInputMember';
import * as saveMemberActions from '../../../actions/saveMember';

const createStore = configureStore();

describe('MemberPage container component', () => {
    it('should renders MemberPage presentational component with member property equals undefined' +
        'passing state equals { member: { member: undefined } }', () => {

        let mockStore = createStore({
            member: {
                member: undefined
            }
        });

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('member')).to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('errors')).to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('saveCompleted')).to.be.undefined;
    });

    it('should renders MemberPage presentational component with member property equals { id: 1 } ' +
        'passing state equals { member: { member: { id: 1 } } }', () => {
        let member = new MemberEntity();
        member.id = 1;

        let mockStore = createStore({
            member: {
                member: member,
                errors: new MemberErrors() //We have to initialize due to deep childrens
            }
        });

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('member')).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('member').id).to.be.equals(member.id);
    });

    it('should renders MemberPage presentational component with errors property equals undefined' +
        'passing state equals { member: { errors: undefined } }', () => {

        let mockStore = createStore({
            member: {
                errors: undefined
            }
        });

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('errors')).to.be.undefined;
    });

    it('should renders MemberPage presentational component with errors property equals { login: "test" }' +
        'passing state equals { member: { errors: { login: "test" } } }', () => {
        let errors = new MemberErrors();
        errors.login = "test";

        let mockStore = createStore({
            member: {
                errors: errors
            }
        });

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('errors')).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('errors').login).to.be.equals(errors.login);
    });

    it('should renders MemberPage presentational component with saveCompleted property equals undefined' +
        'passing state equals { member: { saveCompleted: undefined} }', () => {

        let mockStore = createStore({
            member: {
                saveCompleted: undefined
            }
        });

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('saveCompleted')).to.be.undefined;
    });

    it('should renders MemberPage presentational component with saveCompleted property equals false' +
        'passing state equals { member: { saveCompleted: false} }', () => {

        let mockStore = createStore({
            member: {
                saveCompleted: false
            }
        });

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('saveCompleted')).to.be.false;
    });

    it('should renders MemberPage presentational component and calls to initializeNewMember' +
        'passing state equals { member: { } }', () => {

        let mockStore = createStore({
            member: {

            }
        });

        let initializeNewMemberMock = sinon.stub(initializeMemberActions, 'initializeNewMember');

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        initializeNewMemberMock.restore();

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(initializeNewMemberMock.calledOnce).to.be.true;
    });

    it('should renders MemberPage presentational component and does not call to loadMember' +
        'passing state equals { member: { } }', () => {

        let mockStore = createStore({
            member: {

            }
        });

        let loadMemberActionsMock = sinon.stub(loadMemberActions, 'loadMember');

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        loadMemberActionsMock.restore();

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(loadMemberActionsMock.calledOnce).to.be.false;
    });

    it('should renders MemberPage presentational component and calls to loadMember(1)' +
        'passing state equals { member: { } } and property params equals { id: 1 }', () => {

        let mockStore = createStore({
            member: {

            }
        });

        let params = {
            id: 1
        };

        let loadMemberActionsMock = sinon.stub(loadMemberActions, 'loadMember');

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer params={params} />
            </Provider>
        );

        loadMemberActionsMock.restore();

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(loadMemberActionsMock.calledOnce).to.be.true;
        expect(loadMemberActionsMock.calledWith(params.id)).to.be.true;
    });

    it('should renders MemberPage presentational component and calls to uiInputMember("testField", "testValue")' +
        'passing state equals { member: { } } and calling to fireValidationFieldValueChanged property with ' +
        'parameters "testField" and "testValue"', () => {
        let mockStore = createStore({
            member: {

            }
        });

        let uiInputMemberActionsMock = sinon.stub(uiInputMemberActions, 'uiInputMember');

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        let fireValidationFieldValueChanged = memberPagePresentationalWrapper.prop('fireValidationFieldValueChanged');
        fireValidationFieldValueChanged("testField", "testValue");

        uiInputMemberActionsMock.restore();

        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('fireValidationFieldValueChanged')).not.to.be.undefined;
        expect(uiInputMemberActionsMock.called).to.be.true;
        expect(uiInputMemberActionsMock.calledWith("testField", "testValue")).to.be.true;
    });

    it('should renders MemberPage presentational component and calls to saveMember(member)' +
        'passing state equals { member: { } } and calling to saveMember property with parameter member', () => {
        let mockStore = createStore({
            member: {

            }
        });

        let saveMemberActionsMock = sinon.stub(saveMemberActions, 'saveMember');

        let memberPageContainerWrapper = mount(
            <Provider store={mockStore}>
                <MemberPageContainer />
            </Provider>
        );

        let memberPagePresentationalWrapper = memberPageContainerWrapper.find('MemberPage');
        let saveMember = memberPagePresentationalWrapper.prop('saveMember');
        let member = new MemberEntity();
        member.id = 1;

        saveMember(member);

        saveMemberActionsMock.restore();

        expect(memberPagePresentationalWrapper).not.to.be.undefined;
        expect(memberPagePresentationalWrapper.prop('saveMember')).not.to.be.undefined;
        expect(saveMemberActionsMock.called).to.be.true;
        expect(saveMemberActionsMock.calledWith(member)).to.be.true;
    });
});
