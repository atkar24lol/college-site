'use client';

import {getDictionary} from '@/app/[lang]/dictionaries';
import {Close} from '@mui/icons-material';
import {IconButton, SwipeableDrawer} from '@mui/material';
import {useParams, usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';

const ModalHeader = ({dict, open, onClose, language, setLanguage}) => {
    const [dictionary, setDictionary] = useState();

    const path = usePathname();
    const {lang} = useParams();
    const router = useRouter();

    const handleGetLanguage = () => {
        const dict = getDictionary(language);
        setDictionary(dict);
    };

    const handleChangeLanguage = async (value) => {
        setLanguage(value);
        await getDictionary(language);
    };

    const headerList = [
        {
            title: dict?.header?.list?.main,
            link: `/${lang}/`,
        },

        {
            title: dict?.header?.list?.news,
            link: `/${lang}/news`,
        },

        {
            title: dict?.header?.list?.educationalActivity,
            link: `/${lang}/educationalActivity`,
        },

        {
            title: dict?.header?.list?.gallary,
            link: `/${lang}/gallary`,
        },

        {
            title: dict?.header?.list?.entrants,
            link: `/${lang}/entrants`,
        },

        {
            title: dict?.header?.list?.teachers,
            link: `/${lang}/teachers`,
        },

        {
            title: dict?.header?.list?.contacts,
            link: `/${lang}/contacts`,
        },
        {
            title: dict?.header?.list?.additionalEducation,
            link: `/${lang}/additional-education`,
        },

        {
            title: dict?.header?.list?.aboutTeachers,
            link: `/${lang}/about-teachers`,
        },

        {
            title: dict?.header?.list?.rewards,
            link: `/${lang}/rewards`,
        },

        {
            title: dict?.header?.list?.internationalCooperation,
            link: `/${lang}/international-cooperation`,
        }
    ];

    const languages = [
        {lang: 'KG', value: 'ky'},
        {lang: 'RU', value: 'ru'},
        {lang: 'EN', value: 'en'},
    ];

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        handleGetLanguage();
        const trimmedPath = path.substring(3);
        router.push(`/${language}${trimmedPath}`);
    }, [language]);

    useEffect(() => {
        setLanguage(lang);
    }, []);

    return (
        <SwipeableDrawer
            transitionDuration={500}
            anchor={'left'}
            open={open}
            onClose={onClose}
            onOpen={() => open}
        >
            <div
                className={
                    'w-full h-screen flex flex-col items-center justify-between py-3 bg-[#F1F3F4]'
                }
            >
                <div className="flex flex-col gap-7">
                    <div className={'flex w-full justify-end gap-10 px-4'}>
                        <IconButton onClick={() => handleClose()}>
                            <Close/>
                        </IconButton>
                    </div>

                    <div
                        className={
                            'flex flex-col gap-[24px] justify-evenly items-center px-4 flex-wrap'
                        }
                    >
                        {headerList?.map(({title, link}) => (
                            <a
                                key={link}
                                href={link}
                                onClick={onClose}
                                className={`text-[11px] font-[600] space-x-1 cursor-pointer hover:text-[#0072BC] transition delay-150 tracking-wide ${
                                    path === link ? 'text-[#0072BC]' : 'text-[#000]'
                                }`}
                            >
                                {title}
                            </a>
                        ))}
                    </div>
                </div>

                <div className={'flex gap-[24px]'}>
                    {languages?.map(({lang, value}) => (
                        <p
                            className={`text-[18px] tracking-[0.2px] ${
                                value === language
                                    ? 'text-[#0072BC] font-[700] hover:cursor-pointer hover:text-[#0072BC]'
                                    : 'text-[#969CA3] font-[300] cursor-pointer'
                            }`}
                            key={lang}
                            onClick={() => handleChangeLanguage(value)}
                        >
                            {lang}
                        </p>
                    ))}
                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default ModalHeader;
