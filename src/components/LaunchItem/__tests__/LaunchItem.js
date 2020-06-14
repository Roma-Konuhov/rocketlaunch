import 'react-native';
import React from 'react';
import {
  fireEvent,
  NativeTestEvent,
  cleanup,
  render
} from '@testing-library/react-native';

import { LaunchItem } from '../LaunchItem';
import * as utils from '../../../utils/launchDataUtils';

jest.mock('@expo/vector-icons', () => {
  const View = require('react-native').View;
  return {
    AntDesign: props => <View {...props} />
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn()
    })
  };
});

describe('Component LaunchItem', () => {
  utils.getInfoUrl = jest.fn().mockReturnValue({ uri: 'infoUrl' });
  utils.getImageUrl = jest.fn().mockReturnValue({ uri: 'imageUrl' });
  utils.getCountryFlagUrl = jest.fn().mockReturnValue({ uri: 'countryFlagUrl' });
  utils.getStatus = jest.fn().mockReturnValue('ok');
  utils.getLaunchDate = jest.fn().mockReturnValue('Jan 01, 2020');

  const favourites = {
    list: [],
    originalList: [],
    has: jest.fn().mockReturnValue(false),
    add: jest.fn(),
    remove: jest.fn(),
  };

  const item = {
    id: 1,
    name: 'Falcon',
  };

  afterEach(() => {
    favourites.has.mockReset();
    favourites.add.mockReset();
    favourites.remove.mockReset();
    utils.getInfoUrl.mockReset();
    utils.getImageUrl.mockReset();
    utils.getCountryFlagUrl.mockReset();
    utils.getStatus.mockReset();
    utils.getLaunchDate.mockReset();
    cleanup();
  });

  test('renders all fields', () => {
    const { queryByTestId } = render(<LaunchItem favourites={favourites} item={item}/>);
    const container = queryByTestId('item');
    const favIcon = queryByTestId('touchable-favourite-icon');
    const rocketImage = queryByTestId('rocket-image');
    const header = queryByTestId('header');
    const countryFlag = queryByTestId('country-flag-image');
    const launchDate = queryByTestId('launch-date');
    const launchStatus = queryByTestId('launch-status');

    expect(container).toContainElement(favIcon);
    expect(container).toContainElement(rocketImage);
    expect(container).toContainElement(header);
    expect(container).toContainElement(countryFlag);
    expect(container).toContainElement(launchDate);
    expect(container).toContainElement(launchStatus);
  });

  test('allows to add item to favourites', () => {
    favourites.has.mockReturnValue(false);
    const { queryByTestId } = render(<LaunchItem favourites={favourites} item={item}/>);
    const favIcon = queryByTestId('touchable-favourite-icon');

    fireEvent(favIcon, new NativeTestEvent('press'));

    expect(favourites.add.mock.calls.length).toBe(1);
    expect(favourites.add.mock.calls[0][0]).toEqual({ id: 1, name: 'Falcon' });
  });

  test('allows to remove item from favourites', () => {
    favourites.has.mockReturnValue(true);
    const { queryByTestId } = render(<LaunchItem favourites={favourites} item={item}/>);
    const favIcon = queryByTestId('touchable-favourite-icon');

    fireEvent(favIcon, new NativeTestEvent('press'));

    expect(favourites.remove.mock.calls.length).toBe(1);
    expect(favourites.remove.mock.calls[0][0]).toEqual({ id: 1, name: 'Falcon' });
  });

  test('checks if item is favourite on rendering', () => {
    render(<LaunchItem favourites={favourites} item={item}/>);
    expect(favourites.has.mock.calls.length).toBe(1);
    expect(favourites.has.mock.calls[0][0]).toEqual({ id: 1, name: 'Falcon' });
  });

  test('check if item is favourite on adding/removing', () => {
    const { queryByTestId } = render(<LaunchItem favourites={favourites} item={item}/>);
    const favIcon = queryByTestId('touchable-favourite-icon');

    fireEvent(favIcon, new NativeTestEvent('press'));

    expect(favourites.has.mock.calls.length).toBe(2);
    expect(favourites.has.mock.calls[1][0]).toEqual({ id: 1, name: 'Falcon' });
  });

  test('trigger navigation when item is clicked', () => {
    favourites.has.mockReturnValue(true);
    const renderer = render(<LaunchItem favourites={favourites} item={item}/>);
    const rocketImage = renderer.queryByTestId('rocket-image');
    fireEvent(rocketImage, new NativeTestEvent('press'));

    expect(utils.getInfoUrl.mock.calls.length).toBe(1);
  });
});