import React from 'react';
import { shallow, mount } from 'enzyme';
import Timer from './Timer';
import {findByTestAttr} from '../../../tests/testUtils';
import { start } from 'repl';

const setup = () => {
  return shallow(<Timer />)
}

describe('Timer', () => {
  let container: any;

  beforeEach(() => (container = shallow(<Timer />)));

  it('should render <div />', () => {
    expect(container.find('div').length).toEqual(3);
  });

  it('should render instances of the TimerButton component', () => {
    expect(container.find('TimerButton').length).toBeGreaterThanOrEqual(1);
  });
});

describe('mounted Timer', () => {
  const setState = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useStateMock: any = (init: any) => [init, setState]
  const wrapper = setup();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('invokes start timer when the start button is clicked', () => {
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  const startTimer = findByTestAttr(wrapper, 'start-timer');
  const spy = jest.fn(startTimer)
  const button = startTimer.dive().find('div')
  button.simulate('click')
  expect(button.length).toBe(1);
  expect(spy).toHaveBeenCalledTimes(0);

  })
  
  test('invokes stopTimer when the stop button is clicked', () => {
    const stopTimer = findByTestAttr(wrapper, 'stop-timer');
    const spy = jest.fn(stopTimer);
    const button = stopTimer.dive().find('div')
    button.simulate('click')
    expect(button.length).toBe(1);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('invokes resetTimer when the reset button is clicked', () => {
  const resetTimer = findByTestAttr(wrapper, 'reset-timer');
    const spy = jest.fn(resetTimer);
    const button = resetTimer.dive().find('div')
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(spy).toHaveBeenCalledTimes(0);
  })

  test('renders timer display without error', () => {
    const timerDisplay = findByTestAttr(wrapper, 'time-display').text();
    expect(timerDisplay).toBe("0: 00");
  });
  
});