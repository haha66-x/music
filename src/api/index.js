//把各个功能的导入在这里，封装
import {recommendMusic,newMusic} from './Home'
export const recommendMusicAPI=recommendMusic
export const newMusicAPI=newMusic

import {hotSearch,searchResultList} from '@/api/Search'
export const hotSearchAPI=hotSearch
export const searchResultListAPI=searchResultList 

import {getSongById,getLyricById} from '@/api/Play'

export const getSongByIdAPI=getSongById
export const getLyricByIdAPI=getLyricById