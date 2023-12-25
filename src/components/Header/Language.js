import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';

const Language = (props) => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        // console.log('i18n.resolvedLanguage:', i18n.resolvedLanguage);
        // console.log('i18n.Language:', i18n.language);
    };

    return (
        <>
            <NavDropdown
                title={i18n.resolvedLanguage === 'en' ? 'English' : 'Việt Nam'}
                id="basic-nav-dropdown"
                className="language"
            >
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    );
};

export default Language;
