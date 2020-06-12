import { get } from 'lodash';
import countries from 'i18n-iso-countries';

export const getCountryFlagUrl = item => {
  const cc3alpha = get(item, 'lsp.countryCode');
  const cc2alpha = countries.alpha3ToAlpha2(cc3alpha);

  return `https://www.countryflags.io/${cc2alpha}/flat/24.png`
};