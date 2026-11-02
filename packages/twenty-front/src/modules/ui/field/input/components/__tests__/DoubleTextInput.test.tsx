import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DoubleTextInput } from '@/ui/field/input/components/DoubleTextInput';

it('replaces the full label and URL when clicking into either field', async () => {
  const user = userEvent.setup();
  render(
    <DoubleTextInput
      instanceId="link-text-selection-test"
      firstValue="Eurosport"
      secondValue="https://eurosport.fr"
      firstValuePlaceholder="Link label"
      secondValuePlaceholder="URL"
      selectOnFocus
      onEnter={jest.fn()}
      onEscape={jest.fn()}
      onClickOutside={jest.fn()}
    />,
  );

  const label = screen.getByPlaceholderText('Link label');
  const url = screen.getByPlaceholderText('URL');

  await user.click(label);
  await user.keyboard('Ownward Labs');
  expect(label).toHaveValue('Ownward Labs');

  await user.click(label);
  await user.keyboard('Ownward Labs CRM');
  expect(label).toHaveValue('Ownward Labs CRM');

  await user.click(url);
  await user.keyboard('https://www.ownward.agency');
  expect(url).toHaveValue('https://www.ownward.agency');

  await user.tab({ shift: true });
  await user.keyboard('Updated label');
  expect(label).toHaveValue('Updated label');
});
