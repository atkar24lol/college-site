"use client"

import {getDictionary} from '@/app/[lang]/dictionaries';
import {MenuRounded, Search} from '@mui/icons-material';
import {IconButton, TextField, useMediaQuery, useTheme, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import {useParams, usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import ModalHeader from '../modalHeader/component';
import './styles.css'

const Header = () => {
    const [language, setLanguage] = useState('ru');
    const [searchValue, setSearchValue] = useState('');
    const [dict, setDict] = useState('ru');
    const [modalHeader, setModalHeader] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };
    const {lang, value, newsId, programm} = useParams()
    const path = usePathname();
    const router = useRouter();
    const theme = useTheme();
    const isMdScreen = useMediaQuery("(max-width: 1024px)");
    const isSmScreen = useMediaQuery("(max-width: 600px)");

    let headerImage;
    let headerTitle;
    let headerDescription;

    if (path === `/${lang}` || path === '/' || path === '/ru') {
        if (isMdScreen) {
            headerImage = '/header-main-mobile.png';
            headerTitle = dict?.header?.previews?.titles?.main;
            headerDescription = dict?.header?.previews?.descriptions?.main;

        } else {
            headerImage = '/header-main.png';
            headerTitle = dict?.header?.previews?.titles?.main;
            headerDescription = dict?.header?.previews?.descriptions?.main;
        }
    }

    if (path === `/${lang}/news`) {
        (headerImage = `/blog-and-news-preview.png`), (headerTitle = dict?.header?.previews?.titles?.blogAndNews), (headerDescription = dict?.header?.previews?.descriptions?.blogAndNews)
    }
    if (path === `/${lang}/news/${newsId}`) {
        (headerImage = `/blog-and-news-preview.png`), (headerTitle = dict?.header?.previews?.titles?.blogAndNewsDetails), (headerDescription = dict?.header?.previews?.descriptions?.blogAndNewsDetails)
    }
    if (path === `/${lang}/blog-and-news`) {
        (headerImage = `/blog-and-news-preview.png`), (headerTitle = dict?.header?.previews?.titles?.blogAndNews), (headerDescription = dict?.header?.previews?.descriptions?.blogAndNews)
    }
    if (path === `/${lang}/education-activity`) {
        (headerImage = `/education-activity-preview.png`), (headerTitle = dict?.header?.previews?.titles?.educationActivity), (headerDescription = dict?.header?.previews?.descriptions?.educationActivity)
    }
    if (path === `/${lang}/electron-library`) {
        (headerImage = `/education-activity-preview.png`), (headerTitle = dict?.header?.previews?.titles?.electronLibrary), (headerDescription = dict?.header?.previews?.descriptions?.electronLibrary)
    }
    if (path === `/${lang}/gallary`) {
        (headerImage = `/education-activity-preview.png`), (headerTitle = dict?.header?.previews?.titles?.gallary), (headerDescription = dict?.header?.previews?.descriptions?.gallary)
    }
    if (path === `/${lang}/teachers`) {
        (headerImage = `/teachers-preview.png`), (headerTitle = dict?.header?.previews?.titles?.teachers), (headerDescription = dict?.header?.previews?.descriptions?.teachers)
    }
    if (path === `/${lang}/contacts`) {
        (headerImage = `/contacts-preview.png`), (headerTitle = dict?.header?.previews?.titles?.contacts), (headerDescription = dict?.header?.previews?.descriptions?.contacts)
    }
    if (path === `/${lang}/entrants`) {
        (headerImage = `/contacts-preview.png`), (headerTitle = dict?.header?.previews?.titles?.entrants), (headerDescription = dict?.header?.previews?.descriptions?.entrants)
    }
    if (path === `/${lang}/about-teachers`) {
        (headerImage = `/contacts-preview.png`), (headerTitle = dict?.header?.previews?.titles?.aboutTeachers), (headerDescription = dict?.header?.previews?.descriptions?.aboutTeachers)
    }
    if (path === `/${lang}/additional-education`) {
        (headerImage = `/additional-education-preview.png`), (headerTitle = dict?.header?.previews?.titles?.additionalEducation), (headerDescription = dict?.header?.previews?.descriptions?.additionalEducation)
    }
    if (path === `/${lang}/search/${value}`) {
        (headerImage = `/additional-education-preview.png`), (headerTitle = dict?.header?.previews?.titles?.searchResult), (headerDescription = dict?.header?.previews?.descriptions?.searchResult)
    }
    if (path === `/${lang}/international-cooperation` || path === `/${lang}/international-cooperation/${programm}`) {
        (headerImage = `/additional-education-preview.png`), (headerTitle = dict?.header?.previews?.titles?.internationalCooperation), (headerDescription = dict?.header?.previews?.descriptions?.internationalCooperation)
    }
    if (path === `/${lang}/feedback`) {
        (headerImage = `/additional-education-preview.png`), (headerTitle = dict?.header?.previews?.titles?.internationalCooperation), (headerDescription = dict?.header?.previews?.descriptions?.internationalCooperation)
    }
    if (path === `/${lang}/specialities`) {
        (headerImage = `/additional-education-preview.png`), (headerTitle = dict?.header?.previews?.titles?.specialities), (headerDescription = dict?.header?.previews?.descriptions?.specialities)
    }
    if (path === `/${lang}/specialities/agronomy`) {
        (headerImage = `/agronomy.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.two), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.two)
    }
    if (path === `/${lang}/specialities/veterinary`) {
        (headerImage = `/veterinary.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.three), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.three)
    }
    if (path === `/${lang}/specialities/hydraulic_engineering`) {
        (headerImage = `/hydrotech.webp`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.four), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.four)
    }
    if (path === `/${lang}/specialities/land_management`) {
        (headerImage = `/zemleust.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.five), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.five)
    }
    if (path === `/${lang}/specialities/ichthyology`) {
        (headerImage = `/ihtiologia.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.six), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.six)
    }
    if (path === `/${lang}/specialities/melioration`) {
        (headerImage = `/meliorization.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.seven), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.seven)
    }
    if (path === `/${lang}/specialities/geodesy`) {
        (headerImage = `/geodezia.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.eight), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.eight)
    }
    if (path === `/${lang}/specialities/informatics`) {
        (headerImage = `/informatika.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.nine), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.nine)
    }
    if (path === `/${lang}/specialities/agricultural_entrepreneurship`) {
        (headerImage = `/selhoz.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.ten), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.ten)
    }
    if (path === `/${lang}/specialities/ecology`) {
        (headerImage = `/ecology.jpg`), (headerTitle = dict?.mainPage?.mainInfoBlock?.titles?.eleven), (headerDescription = dict?.mainPage?.mainInfoBlock?.descriptions?.eleven)
    }

    const headerList = [
        {
            title: dict?.header?.list?.news, link: `/${lang}/news`
        },
        {
            title: dict?.header?.list?.educationalActivity, link: `/${lang}/education-activity`
        },
        {
            title: dict?.header?.list?.gallary, link: `/${lang}/gallary`
        },
        {
            title: dict?.header?.list?.entrants, link: `/${lang}/entrants`
        },
        {
            title: dict?.header?.list?.teachers, link: `/${lang}/teachers`
        },]

    const headerList2 = [
        {
            title: dict?.header?.list?.additionalEducation, link: `/${lang}/additional-education`,
        },

        {
            title: dict?.header?.list?.aboutTeachers, link: `/${lang}/about-teachers`,
        },

        {
            title: dict?.header?.list?.rewards, link: `/${lang}/awards`,
        },

        {
            title: dict?.header?.list?.internationalCooperation, link: `/${lang}/international-cooperation`,
        },

        {
            title: dict?.header?.list?.contacts, link: `/${lang}/contacts`
        },]

    const languages = [{selectedLang: 'KG', value: 'ky'}, {selectedLang: 'RU', value: 'ru'}, {
        selectedLang: 'EN', value: 'en'
    },];

    const handleGetLanguage = async () => {
        const dict = await getDictionary(language);
        setDict(dict);
    };

    const toggleModalHeader = (value) => {
        setModalHeader(value);
    };

    const handleChangeValue = (e) => {
        setSearchValue(e.target.value);
    };

    const handleChangeLanguage = (value) => {
        setLanguage(value);
        const trimmedPath = path.substring(3);
        router.push(`/${value}${trimmedPath}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchValue !== '' && searchValue !== 'undefined') {
            router.push(`/${lang}/search/${searchValue}`)
        }
    }

    useEffect(() => {
        handleGetLanguage();
        const trimmedPath = path.substring(3);
        if (language && language !== 'undefined') {
            router.push(`/${language}${trimmedPath}`);
        } else {
            router.push('/ru');
        }
    }, [language]);

    return (<div className='w-full'>
        {/*3*/}
        <div className={`${path === `/${lang}/site-map` || path === `/${lang}/contacts` ? 'hidden' : 'flex'} header w-full overflow-y-hidden p-[80px] xl:px-[40px] lg:px-[20px] md:px-[20px] sm:px-[20px] pt-[100px] xl:pt-[70px] lg:pt-[50px] md:pt-[40px] sm:pt-[20px] pb-[120px] xl:pb-[100px] lg:pb-[80px] md:pb-[20px] sm:pb-[20px] md:min-h-[460px] sm:min-h-[250px] flex flex-col gap-[2.5px] md:gap-4 sm:gap-1 justify-start items-center md:items-start sm:items-start relative`}>
            <div
                className="bg-cover bg-center bg-no-repeat  shadow-xl"
                style={{
                    backgroundImage: `url(${headerImage})`,
                    position: 'absolute',
                    zIndex: '-1',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}>

            </div>

            <p className='max-w-[1280px] font-montserratTitle opacity-[100] font-[800] text-[#ffffff] text-[40px] xl:text-[36px] lg:text-[32px] md:text-[40px] sm:text-[24px]'>
                {headerTitle}
            </p>

            <span
                className='max-w-[1280px] font-montserratTitle font-[400] text-[#ffffff] text-[14px] xl:text-[13px] lg:text-[12px] md:text-[20px] sm:text-[13px] text-center md:text-start sm:text-start'>
                    {headerDescription}
                </span>

        </div>

        <ModalHeader
            dict={dict}
            open={modalHeader}
            onClose={() => toggleModalHeader(false)}
            language={language}
            setLanguage={setLanguage}
        />
    </div>);
};

export default Header;