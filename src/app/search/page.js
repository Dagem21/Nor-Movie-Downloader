"use client"

import Header from "@/components/header/header";
import { addFavorite } from "@/mongo/favorite";
import { useContext, useState } from "react";
import { UserContext } from "../usercontext";

export default function Search() {
    const { user } = useContext(UserContext)

    const [searchPhrase, setSearchPhrase] = useState("")
    const [movies, setMovies] = useState([
        {
            "score": 0.90671307,
            "show": {
                "id": 26856,
                "url": "https://www.tvmaze.com/shows/26856/you",
                "name": "You",
                "type": "Scripted",
                "language": "English",
                "genres": [
                    "Drama",
                    "Romance",
                    "Thriller"
                ],
                "status": "Running",
                "runtime": null,
                "averageRuntime": 52,
                "premiered": "2018-09-09",
                "ended": null,
                "officialSite": "https://www.netflix.com/title/80211991",
                "schedule": {
                    "time": "",
                    "days": []
                },
                "rating": {
                    "average": 7.5
                },
                "weight": 99,
                "network": null,
                "webChannel": {
                    "id": 1,
                    "name": "Netflix",
                    "country": null,
                    "officialSite": "https://www.netflix.com/"
                },
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 336924,
                    "imdb": "tt7335184"
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/552/1381152.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/552/1381152.jpg"
                },
                "summary": "\u003Cp\u003EA dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.\u003C/p\u003E",
                "updated": 1737069573,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/26856"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/2399817",
                        "name": "The Death of Jonathan Moore"
                    },
                    "nextepisode": {
                        "href": "https://api.tvmaze.com/episodes/3114207",
                        "name": "TBA"
                    }
                }
            }
        },
        {
            "score": 0.6942509,
            "show": {
                "id": 42757,
                "url": "https://www.tvmaze.com/shows/42757/extraordinary-you",
                "name": "Extraordinary You",
                "type": "Scripted",
                "language": "Korean",
                "genres": [
                    "Drama",
                    "Romance"
                ],
                "status": "Ended",
                "runtime": 35,
                "averageRuntime": 35,
                "premiered": "2019-10-02",
                "ended": "2019-11-21",
                "officialSite": "http://www.imbc.com/broad/tv/drama/extraordinaryyou/",
                "schedule": {
                    "time": "20:55",
                    "days": [
                        "Wednesday",
                        "Thursday"
                    ]
                },
                "rating": {
                    "average": 8
                },
                "weight": 87,
                "network": {
                    "id": 166,
                    "name": "MBC",
                    "country": {
                        "name": "Korea, Republic of",
                        "code": "KR",
                        "timezone": "Asia/Seoul"
                    },
                    "officialSite": null
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 367122,
                    "imdb": "tt10826102"
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/211/527722.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/211/527722.jpg"
                },
                "summary": "\u003Cp\u003EIt tells the story of a girl who realizes that she is a supporting character inside a romance manga named \"Secret\". She tries to change the fixed story for her love and life.\u003C/p\u003E",
                "updated": 1574455012,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/42757"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/1750168",
                        "name": "Episode 32"
                    }
                }
            }
        },
        {
            "score": 0.6907407,
            "show": {
                "id": 79563,
                "url": "https://www.tvmaze.com/shows/79563/fourever-you",
                "name": "Fourever You",
                "type": "Scripted",
                "language": "Thai",
                "genres": [
                    "Romance"
                ],
                "status": "Running",
                "runtime": 60,
                "averageRuntime": 60,
                "premiered": "2024-10-03",
                "ended": null,
                "officialSite": "https://wetv.vip/en/play/1ci6pha8sn1tf5h-Fourever%20You%20(Uncut%20Ver.)/t4100l7xft2-EP1%3A%20Fourever%20You%20(Uncut%20Ver.)",
                "schedule": {
                    "time": "20:30",
                    "days": [
                        "Thursday"
                    ]
                },
                "rating": {
                    "average": null
                },
                "weight": 81,
                "network": {
                    "id": 1095,
                    "name": "GMM25",
                    "country": {
                        "name": "Thailand",
                        "code": "TH",
                        "timezone": "Asia/Bangkok"
                    },
                    "officialSite": "https://www.gmm25.com/"
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 442610,
                    "imdb": null
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/535/1338826.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/535/1338826.jpg"
                },
                "summary": "\u003Cp\u003EEaster, who attends university in the north of Thailand, hopes to find a new place to erase the memories about his ex-relationship which ended unclearly. But who would think that in this university he will meet Hill, his ex, again. It is the beginning of the relationship that will not be ending in the same way ever. At the same time his roommate North, also faces the chaos because he was drunk and caused a quarrel. But it could be more chaotic because god just sent him a flirtatious and very spoiled creditor Johan. So, the stories of these roommates have begun among the laughter of the friends from Art club like Typhoon and Dao-Tok. Also with the senior medical students Tonfah and Arthit. Their friendship in this university and the love stories will be their memorable notes for a long time.\u003C/p\u003E",
                "updated": 1738944703,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/79563"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/3108067",
                        "name": "Episode 17"
                    }
                }
            }
        },
        {
            "score": 0.68846154,
            "show": {
                "id": 77233,
                "url": "https://www.tvmaze.com/shows/77233/except-you",
                "name": "Except You",
                "type": "Scripted",
                "language": "English",
                "genres": [
                    "Drama"
                ],
                "status": "In Development",
                "runtime": 60,
                "averageRuntime": null,
                "premiered": null,
                "ended": null,
                "officialSite": null,
                "schedule": {
                    "time": "",
                    "days": []
                },
                "rating": {
                    "average": null
                },
                "weight": 77,
                "network": {
                    "id": 4,
                    "name": "FOX",
                    "country": {
                        "name": "United States",
                        "code": "US",
                        "timezone": "America/New_York"
                    },
                    "officialSite": "https://www.fox.com/"
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": null,
                    "imdb": null
                },
                "image": null,
                "summary": "\u003Cp\u003E\u003Cb\u003EExcept You \u003C/b\u003Efollows Erica, who can't help but fall in love with everyone she meets. When her ambitious ex, an FBI agent who used Erica's infatuations to get closer to criminals, goes rogue, she'll have to help the Feds track down her ex, one mortifying crush at a time.\u003C/p\u003E\u003Cp\u003E\u003Cbr /\u003E \u003C/p\u003E",
                "updated": 1716309988,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/77233"
                    }
                }
            }
        },
        {
            "score": 0.6856137,
            "show": {
                "id": 82394,
                "url": "https://www.tvmaze.com/shows/82394/dear-you",
                "name": "Dear You",
                "type": "Scripted",
                "language": "French",
                "genres": [
                    "Drama",
                    "Comedy",
                    "Romance"
                ],
                "status": "Running",
                "runtime": null,
                "averageRuntime": null,
                "premiered": "2025-02-07",
                "ended": null,
                "officialSite": null,
                "schedule": {
                    "time": "",
                    "days": [
                        "Friday"
                    ]
                },
                "rating": {
                    "average": null
                },
                "weight": 72,
                "network": null,
                "webChannel": {
                    "id": 3,
                    "name": "Prime Video",
                    "country": null,
                    "officialSite": "https://www.primevideo.com"
                },
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 458914,
                    "imdb": null
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/554/1385705.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/554/1385705.jpg"
                },
                "summary": "\u003Cp\u003EAlma, a young Parisian, juggles between her professional life in a palace and a complex love life. Combining love, humor and sensuality, this French romance depicts today's romantic and friendly relationships through the eyes of a generation that is connected, open, demanding and in search of meaning.\u003C/p\u003E",
                "updated": 1738864031,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/82394"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/3129811",
                        "name": "Episode 15"
                    }
                }
            }
        },
        {
            "score": 0.68509126,
            "show": {
                "id": 14608,
                "url": "https://www.tvmaze.com/shows/14608/without-you",
                "name": "Without You",
                "type": "Scripted",
                "language": "English",
                "genres": [
                    "Drama",
                    "Crime",
                    "Mystery"
                ],
                "status": "Ended",
                "runtime": 60,
                "averageRuntime": 60,
                "premiered": "2011-12-08",
                "ended": "2011-12-22",
                "officialSite": null,
                "schedule": {
                    "time": "21:00",
                    "days": [
                        "Thursday"
                    ]
                },
                "rating": {
                    "average": 7.5
                },
                "weight": 71,
                "network": {
                    "id": 35,
                    "name": "ITV1",
                    "country": {
                        "name": "United Kingdom",
                        "code": "GB",
                        "timezone": "Europe/London"
                    },
                    "officialSite": "https://www.itv.com/"
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 254215,
                    "imdb": "tt2078467"
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/49/123809.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/49/123809.jpg"
                },
                "summary": "\u003Cp\u003EEllie and her husband Greg are planning a romantic evening in when he returns from work in the evening. He later calls to say he is going to be late, but when the doorbell finally rings long after he said he would be home, it is two police officers on the doorstep, not Greg. They tell Ellie that Greg has been killed in a car crash. There was an unidentified woman in the car with him…\u003C/p\u003E",
                "updated": 1704794877,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/14608"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/665853",
                        "name": "Episode 3"
                    }
                }
            }
        },
        {
            "score": 0.6779279,
            "show": {
                "id": 80341,
                "url": "https://www.tvmaze.com/shows/80341/marry-you",
                "name": "Marry You",
                "type": "Scripted",
                "language": "Korean",
                "genres": [
                    "Drama",
                    "Comedy",
                    "Romance"
                ],
                "status": "Ended",
                "runtime": 60,
                "averageRuntime": 60,
                "premiered": "2024-11-16",
                "ended": "2024-12-15",
                "officialSite": "https://www.ichannela.com/program/detail/program_detail_renew.do?cateCode=0502290000",
                "schedule": {
                    "time": "19:50",
                    "days": [
                        "Saturday",
                        "Sunday"
                    ]
                },
                "rating": {
                    "average": null
                },
                "weight": 62,
                "network": {
                    "id": 538,
                    "name": "Channel A",
                    "country": {
                        "name": "Korea, Republic of",
                        "code": "KR",
                        "timezone": "Asia/Seoul"
                    },
                    "officialSite": null
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 444409,
                    "imdb": "tt34376313"
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/543/1358123.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/543/1358123.jpg"
                },
                "summary": "\u003Cp\u003ELevel seven government worker Jung Ha-na's dream is to retire peacefully, but her feisty attitude lands her in the Marriage Promotion Team at Injeong City Hall, a role she finds baffling as she doesn't believe in marriage herself. To make matters worse, her ex-boyfriend Ki-jun, whom she nearly married three years ago, appears as her new team leader, adding to her disbelief. Desperate to escape the team, Ha-na is tasked with marrying off local bachelor Cheol-hee. Though Cheol-hee initially refuses, believing he's not suited for marriage, Ha-na's determination gradually softens his heart. As they open up to each other, Ha-na and Cheol-hee, who both doubted their worthiness of marriage, find themselves questioning if they can take the plunge after all. Will Ha-na and Cheol-hee finally gather the courage to believe in love and marriage?\u003C/p\u003E",
                "updated": 1734467162,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/80341"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/3049090",
                        "name": "Episode 10"
                    }
                }
            }
        },
        {
            "score": 0.6767734,
            "show": {
                "id": 16381,
                "url": "https://www.tvmaze.com/shows/16381/smile-you",
                "name": "Smile, You",
                "type": "Scripted",
                "language": "Korean",
                "genres": [
                    "Drama",
                    "Comedy",
                    "Romance"
                ],
                "status": "Ended",
                "runtime": 65,
                "averageRuntime": 65,
                "premiered": "2009-09-26",
                "ended": "2010-03-07",
                "officialSite": "http://tv.sbs.co.kr/yousmile/",
                "schedule": {
                    "time": "21:45",
                    "days": [
                        "Saturday",
                        "Sunday"
                    ]
                },
                "rating": {
                    "average": null
                },
                "weight": 61,
                "network": {
                    "id": 127,
                    "name": "SBS",
                    "country": {
                        "name": "Korea, Republic of",
                        "code": "KR",
                        "timezone": "Asia/Seoul"
                    },
                    "officialSite": null
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": 33505,
                    "thetvdb": 175251,
                    "imdb": null
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/462/1157246.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/462/1157246.jpg"
                },
                "summary": "\u003Cp\u003ESeo Jung In is the second daughter of a chaebol family, whose family suddenly meets with financial ruin. She is dumped by her husband, Lee Han Se, after their wedding ceremony when his family finds out about her family's financial problems. Her family is then left with no other alternative but to move in with their longtime chauffeur's family. The once rich and spoiled daughter and her family must now learn how to adjust to life as commoners in the Kang household.\u003C/p\u003E",
                "updated": 1685269716,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/16381"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/749643",
                        "name": "Episode 45"
                    }
                }
            }
        },
        {
            "score": 0.664094,
            "show": {
                "id": 31725,
                "url": "https://www.tvmaze.com/shows/31725/only-you",
                "name": "Only You",
                "type": "Scripted",
                "language": "Korean",
                "genres": [
                    "Drama",
                    "Romance"
                ],
                "status": "Ended",
                "runtime": 75,
                "averageRuntime": 75,
                "premiered": "2005-06-04",
                "ended": "2005-07-24",
                "officialSite": "http://tv.sbs.co.kr/onlyyou/",
                "schedule": {
                    "time": "21:45",
                    "days": [
                        "Saturday",
                        "Sunday"
                    ]
                },
                "rating": {
                    "average": null
                },
                "weight": 48,
                "network": {
                    "id": 127,
                    "name": "SBS",
                    "country": {
                        "name": "Korea, Republic of",
                        "code": "KR",
                        "timezone": "Asia/Seoul"
                    },
                    "officialSite": null
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 211621,
                    "imdb": "tt0813811"
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/127/317531.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/127/317531.jpg"
                },
                "summary": "\u003Cp\u003EEun Jae was a stubborn and head-strong girl who had a passion for cooking. She did not have any interest in going to college and with the help of her high school friend, Jung Hyun Sung ran away to Italy to enroll in a cooking school. Jung Hyun Sung who loved her dearly went along with her.\u003C/p\u003E\u003Cp\u003EHan Yi Joon came from a wealthy family. He travelled to Italy looking for his mother and there he ran into Eun Jae, who had also been seeking the same person to learn the secrets to making great pasta. She comforted Yi Joon, who was distraught over his mother's remarrying, and they ended up making love. Yi Joon left Eun Jae the next morning over some misunderstanding. Eun Jae became pregnant and had no choice but to give up her dream and to return to Korea.\u003C/p\u003E\u003Cp\u003E6 years later, Eun Jae was working in low paying restaurant jobs, Yi Joon atarted to take over the operations of his family's business, and Hyun Sung was working as a chef for one of the restaurants owned by Yi Joon and managed by Ji Soo Yun. Hyun Sung was good with Eun Jae's son and he was helping out Eun Jae's whole family financially as they had fallen on hard times. Yi Joon found out that he still had feelings for Eun Jae as they ran into each other when he was looking for a new chef for his restaurant. The dramatic tension unfolds as the four main characters worked out their feelings for each other.\u003C/p\u003E",
                "updated": 1573162389,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/31725"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/1290475",
                        "name": "Episode 16"
                    }
                }
            }
        },
        {
            "score": 0.6632791,
            "show": {
                "id": 79521,
                "url": "https://www.tvmaze.com/shows/79521/you-bet",
                "name": "You Bet!",
                "type": "Game Show",
                "language": "English",
                "genres": [],
                "status": "To Be Determined",
                "runtime": null,
                "averageRuntime": 78,
                "premiered": "2024-12-07",
                "ended": null,
                "officialSite": "https://www.itv.com/watch/you-bet!/10a5760",
                "schedule": {
                    "time": "",
                    "days": []
                },
                "rating": {
                    "average": null
                },
                "weight": 47,
                "network": {
                    "id": 35,
                    "name": "ITV1",
                    "country": {
                        "name": "United Kingdom",
                        "code": "GB",
                        "timezone": "Europe/London"
                    },
                    "officialSite": "https://www.itv.com/"
                },
                "webChannel": null,
                "dvdCountry": null,
                "externals": {
                    "tvrage": null,
                    "thetvdb": 457391,
                    "imdb": null
                },
                "image": {
                    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/546/1367197.jpg",
                    "original": "https://static.tvmaze.com/uploads/images/original_untouched/546/1367197.jpg"
                },
                "summary": "\u003Cp\u003ECrammed full of epic challenges, mind-blowing feats, big-name celebrities and nail-biting suspense, \u003Cb\u003EYou Bet!\u003C/b\u003E is back with a fresh new update. Members of the public will use their unique abilities to pull off the most outrageous challenges imaginable, and all for the chance of winning a big cash prize.\u003C/p\u003E",
                "updated": 1735059075,
                "_links": {
                    "self": {
                        "href": "https://api.tvmaze.com/shows/79521"
                    },
                    "previousepisode": {
                        "href": "https://api.tvmaze.com/episodes/3079847",
                        "name": "Episode 2"
                    }
                }
            }
        }
    ])
    const [selectedMovie, setSelectedMovie] = useState()

    const handleSearch = (e) => {
        e.preventDefault()
    }

    console.log(user);
    const handleAddFavorite = async () => {
        const addResponse = await addFavorite(user.userID, selectedMovie?.show?.id, selectedMovie?.show?.name, null, selectedMovie?.show?.status)
        console.log(addResponse);
    }
    return (
        <div className="h-screen">
            <Header />
            <div className="">
                <div>
                    <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Movie name"
                                value={searchPhrase}
                                onChange={(e) => { setSearchPhrase(e.target.value) }}
                                required
                            />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
                {
                    movies.length > 0 &&
                    <div className="grid grid-cols-4 pt-3">
                        <div className="col-start-1 col-span-1 border border-solid shadow-xl rounded-xl border-stone-600 ml-3 p-3">
                            <h1 className="text-l font-bold text-gray-300 text-center">Results</h1>
                            {
                                movies.map((movie) => {
                                    return <h1
                                        key={movie?.show?.id}
                                        className={`py-1 text-sm font-bold ${selectedMovie === movie ? 'border-r border-solid border-indigo-600' : ''}`}
                                        onClick={() => { setSelectedMovie(movie) }}
                                    >
                                        {movie?.show?.name}
                                    </h1>
                                })
                            }
                        </div>
                        {
                            selectedMovie &&
                            <div className="col-start-2 col-span-3 px-10 py-3 flex">
                                <div className="flex justify-center mr-4">
                                    <img className="max-w-64" src={selectedMovie?.show?.image?.original} />
                                </div>
                                <div>
                                    <div className="max-w-full">
                                        <h1 className="text-2xl font-bold text-gray-300 text-start">{selectedMovie?.show?.name}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Rating: </span>{selectedMovie?.show?.rating?.average}</h1>
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Status: </span>{selectedMovie?.show?.status}</h1>
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Genres: </span>{selectedMovie?.show?.genres?.join(', ')}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-center"><span className="text-sm font-bold text-gray-300">Premiered:  </span>{selectedMovie?.show?.premiered ? new Date(selectedMovie?.show?.premiered).toDateString() : 'N/A'}</h1>
                                    </div>
                                    <div className="flex justify-between pt-5">
                                        <h1 className="text-l font-bold text-blue-300 text-start"><span className="text-sm font-bold text-gray-300">Summary:  </span>{selectedMovie?.show?.summary?.replace(/(<([^>]+)>)/gi, "")}</h1>
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            type="button"
                                            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                                            onClick={handleAddFavorite}
                                        >
                                            <svg className="mr-2" fill="#00bd0d" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 45.402 45.402" stroke="#00bd0d" strokeWidth="2.6333159999999998">
                                                <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                                            </svg>
                                            Add to Favorite
                                        </button>
                                    </div>
                                </div>



                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}
