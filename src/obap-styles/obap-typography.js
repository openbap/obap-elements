/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css } from 'lit-element';

const display = css`
  /* 34px */
  .typography-display {
    font-size: 2.125rem;
    line-height: 2.5rem;
    letter-spacing: 0.0074em;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/* 24px */
const headline = css`
  .typography-headline {
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: normal;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/* 20px */
const title = css`
  .typography-title {
    font-size: 1.25rem;
    line-height: 2rem;
    letter-spacing: 0.0075em;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/* 16px */
const subtitle = css`
  .typography-subtitle {
    font-size: 1rem;
    line-height: 1.75rem;
    letter-spacing: 0.0094em;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
`;

/* 13px */
const body = css`
  .typography-body {
    font-size: 0.8125rem;
    line-height: 1.15rem;
    letter-spacing: 0.0179em;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
`;

/* 12px */
const button = css`
  .typography-button {
    font-size: 0.75rem;
    line-height: 1.25rem;
    letter-spacing: 0.0333em;
    text-transform: uppercase;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/* 11px */
const caption = css`
  .typography-caption {
    font-size: 0.6875rem;
    line-height: 1.15rem;
    letter-spacing: 0.0333em;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
  }
`;

/* 10px -> 11px */
const overline = css`
  .typography-overline {
    /*font-size: 0.625rem;*/
    font-size: 0.6875rem;
    line-height: 2rem;
    letter-spacing: 0.1500em;
    text-transform: uppercase;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
`;

/* 14px */
const code = css`
  .typography-code {
    font-family: 'Roboto Mono', monospace;
    font-size: .8125rem;
    line-height: 1.25rem;
    letter-spacing: normal;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
`;

const typography = [display, headline, title, subtitle, body, button, caption, overline, code];
export { display, headline, title, subtitle, body, button, caption, overline, code, typography } 
