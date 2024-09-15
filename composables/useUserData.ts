export interface Skill{
  name: string
  level: number
}

export interface UserData {
  name: string
  avatar: string
  contact: string[]
  status: string
  skills: Skill[]
  hobbies: string[]
  bio: string
  projekte: number[]
}

interface UserDataWithId {
  id: number
  avatar: string
  contact: string[]
  name: string
  status: string
  skills: Skill[]
  hobbies: string[]
  bio: string
  projekte: number[]
}

export const useUserData = () => {
  const userData = useState<UserData>('userData', () => ({name: "", avatar: "mr", contact: [], status: "", skills: [], hobbies: [], bio: "", projekte: []}));
  const { userId } = useAuth()
  const allSkills = useState<string[]>('allSkills', () => [])
  const allHobbies = useState<string[]>('allHobbies', () => [])
  
  // login with credentials
  const fetchData = async (id = userId.value) => {
    try {
      // send request to api/data
      const dataRequest = await $fetch('/api/data/getUserData', {
        method: 'POST',
        body: {
          id: id,
        }
      })
      if(dataRequest.success && dataRequest.result){
        userData.value = JSON.parse(dataRequest.result.data)
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "There's a fracture in the Weave. Roll Arcana to investigate.",
        })
      }
    }
    catch (error) {
      console.error('Error while fetching data:', error)
    }
  }

  const updateUserData = async (id = userId.value, data: Object) => {
    const dataString = JSON.stringify(data)

    try {
      // send credentials to api/auth
      const dataRequest = await $fetch('/api/data/updateUserData', {
        method: 'POST',
        body: {
          id: id,
          data: dataString,
        }
      })
      if(dataRequest.success && dataRequest.result){
        userData.value = JSON.parse(dataRequest.result.data)
      }
    }
    catch (error) {
      // console.error(error.statusMessage);
    }
  }

  // fetch userData & return name from the JSON
  const getName = (id = userId.value) => {
    fetchData(id).then(() => {
      return userData.value.name
    })
  }

  // fetch userData & return avatar from the JSON
  const getAvatar = (id = userId.value) => {
    fetchData(id)
    return userData.value.avatar
  }

  const fetchAllData = async () => {
    try {
      // send request to api/data
      const dataRequest = await $fetch('/api/data/getAllUserData', {
        method: 'POST',
        body: {}
      })
      if(dataRequest.success && dataRequest.result){
        return dataRequest.result
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "There's a fracture in the Weave. Roll Arcana to investigate.",
        })
      }
    }
    catch (error) {
      console.error('Error while fetching data:', error)
    }
  }

  const getHobbies = async () => {
    const data = await fetchAllData()
    data?.forEach((item: UserDataWithId) => {
      item.hobbies.forEach((hobby: string) => {
        if (!allHobbies.value.includes(hobby)) {
          allHobbies.value.push(hobby);
        }
      })
    })
  }

  return { getName, getAvatar, updateUserData, fetchData, userData, getHobbies, allHobbies }
}