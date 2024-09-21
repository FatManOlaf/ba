import type { UserDataShort } from '~/composables/useUserData'

export interface Project{
  id: number,
  owner: number,
  title: string,
  requiredSkills: string[],
  description: string,
  goal: string,
  winCondition: string,
  whyAchieveable: string,
  whyRelevant: string,
  deadline: string,
  members: UserDataShort[],
  resources: object[]
  isLookingForMembers: boolean,
  isVisible: boolean,
  isDone: boolean,
}

export const useProjectsData = () => {
  const projectsList = useState<Project[]>('projectsList', () => [])
  const members = ref<UserDataShort[]>([])

  const fetchProjectData = async (id: number) => {
    try {
      const dataRequest: any = await $fetch('/api/data/getProjectData', {
        method: 'POST',
        body: {
          id: id
        }
      })
      if(dataRequest.success && dataRequest.result){
        return { 
          project: ({
            id: dataRequest.result.id,
            owner: dataRequest.result.owner,
            title: dataRequest.result.title,
            requiredSkills: JSON.parse(dataRequest.result.requiredSkills),
            description: dataRequest.result.description,
            goal: dataRequest.result.goal,
            winCondition: dataRequest.result.winCondition,
            whyAchieveable: dataRequest.result.whyAchieveable,
            whyRelevant: dataRequest.result.WhyRelevant,
            deadline: dataRequest.result.deadline,
            members: JSON.parse(dataRequest.result.members),
            resources: JSON.parse(dataRequest.result.resources),
            isLookingForMembers: !!dataRequest.result.isLookingForMembers,
            isVisible: !!dataRequest.result.isVisible,
            isDone: !!dataRequest.result.isDone
          })
        }
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

  const updateProjectsList = async () => {
    try {
      const dataRequest: any = await $fetch('/api/data/getAllProjectsData', {
        method: 'POST',
        body: {}
      })
      if(dataRequest.success && dataRequest.result){
        projectsList.value = dataRequest.result.map((p: any) => ({
          id: p.id,
          owner: p.owner,
          title: p.title,
          requiredSkills: JSON.parse(p.requiredSkills),
          description: p.description,
          goal: p.goal,
          winCondition: p.winCondition,
          whyAchieveable: p.whyAchieveable,
          whyRelevant: p.WhyRelevant,
          deadline: p.deadline,
          members: JSON.parse(p.members),
          resources: JSON.parse(p.resources),
          isLookingForMembers: !!p.isLookingForMembers,
          isVisible: !!p.isVisible,
          isDone: !!p.isDone
        }))
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

  const fetchMembers = async (ids: number[] = []) => {
    for(let id of ids){
      try{
        let memberRequest: any = await $fetch('/api/data/getUserData', {
          method: 'POST',
          body: {
            id: id,
          }
        })
        memberRequest = JSON.parse(memberRequest.result.data)
        members.value.push({
          name: memberRequest.name,
          id: memberRequest.id,
          avatar: memberRequest.avatar,
          skills: memberRequest.skills,
        })
      } catch (error){
        console.error(error)
      }
    }
    return members.value
  }

  return {
    projectsList, updateProjectsList,
    fetchProjectData,
    fetchMembers
  }
};