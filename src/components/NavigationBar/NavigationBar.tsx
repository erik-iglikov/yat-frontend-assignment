import { Icon } from "components/Icon";
import { ICON_NAMES } from "constants/iconNames";

export const NavigationBar = () => {
    return (
        <section className="navigation-bar">
            <div className="button-wrapper">
                <button className="icon-button">
                    <Icon
                        iconName={ICON_NAMES.HOME}
                        size='large' />
                </button>
            </div>

            <div className="button-wrapper">
                <button className="icon-button">
                    <Icon
                        iconName={ICON_NAMES.PROFILE}
                        size='large' />
                </button>
            </div>

            <div className="button-wrapper">
                <button className="icon-button">
                    <Icon
                        iconName={ICON_NAMES.EMOJI}
                        size='large' />
                </button>
            </div>

            <div className="button-wrapper">
                <button className="icon-button">
                    <Icon
                        iconName={ICON_NAMES.DIAMOND}
                        size='large' />
                </button>
            </div>
        </section>
    )
}