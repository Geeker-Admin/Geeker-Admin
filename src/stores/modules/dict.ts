import { defineStore } from 'pinia'
import type { Dict } from '@/api/system/dict'
import { useStorage } from '@vueuse/core'
import { DictAPI } from '@/api/system/dict'
import { DICT_CACHE_TIME } from '@/constants'

export const useDictStore = defineStore('geeker-dict', () => {
  const dict = useStorage<Record<string, { list: Dict[]; __cache_time: number }>>('geeker-dict', {}, localStorage, {
    mergeDefaults: true,
  })

  const getDict = (code: string) => {
    const cached = dict.value[code]
    if (cached && cached.__cache_time && Date.now() - cached.__cache_time < DICT_CACHE_TIME) {
      return Promise.resolve(cached.list)
    }
    return DictAPI.getDictData(code).then(data => {
      dict.value[code] = { list: data, __cache_time: Date.now() }
      return data
    })
  }

  const getAllDict = () => {
    return DictAPI.getAllDict().then(data => {
      data.forEach(item => {
        dict.value[item.code] = { list: item.list, __cache_time: Date.now() }
      })
      return data
    })
  }

  const clearDict = () => {
    dict.value = {}
  }

  return { getDict, clearDict, getAllDict }
})
