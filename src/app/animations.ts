import { animate, query, style, transition, trigger } from '@angular/animations';

const animazione = '150ms 0ms ease';

export const fadeAnimation =
  trigger('fadeAnimation', [
    transition('* <=> *', [
      query(
        ':enter',
        [style({ opacity: 0, transform: 'scale(0.98)' })],
        { optional: true }
      ),
      query(
        ':leave',
        [style({ opacity: 1, transform: 'scale(1)' }), animate(animazione, style({ opacity: 0, transform: 'scale(0.99)' }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ opacity: 0, transform: 'scale(0.99)' }), animate(animazione, style({ opacity: 1, transform: 'scale(1)' }))],
        { optional: true }
      )
    ])
  ]);
