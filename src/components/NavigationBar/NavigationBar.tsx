import { IconButton } from 'components/IconButton';
import { ICON_NAMES } from 'constants/iconNames';

export const NavigationBar = () => {
  return (
    <section className="navigation-bar" data-testid="navigation-bar">
      <div className="button-wrapper" data-testid={`${'icon-button-' + ICON_NAMES.HOME}`}>
        <IconButton iconName={ICON_NAMES.HOME} />
      </div>

      <div className="button-wrapper" data-testid={`${'icon-button-' + ICON_NAMES.PROFILE}`}>
        <IconButton iconName={ICON_NAMES.PROFILE} />
      </div>

      <div className="button-wrapper" data-testid={`${'icon-button-' + ICON_NAMES.EMOJI}`}>
        <IconButton iconName={ICON_NAMES.EMOJI} />
      </div>

      <div className="button-wrapper" data-testid={`${'icon-button-' + ICON_NAMES.DIAMOND}`}>
        <IconButton iconName={ICON_NAMES.DIAMOND} />
      </div>
    </section>
  );
};
