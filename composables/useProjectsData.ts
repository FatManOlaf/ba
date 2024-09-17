import type { UserDataShort } from '~/composables/useUserData'

export interface Project{
  id: number,
  owner: number,
  title: string,
  requiredSkills: string[],
  description: string,
  members: UserDataShort[],
  resources: object[]
  isLookingForMembers: boolean,
  isVisible: boolean,
  isDone: boolean,
}

export const useProjectsData = () => {
  const projectsList = useState<Project[]>('projectsList', () => [])

  const fetchProjectData = async (id: number) => {
    try {
      const dataRequest = await $fetch('/api/data/getProjectData', {
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

  const updateQuestionsList = async () => {
    try {
      const dataRequest = await $fetch('/api/data/getAllQuestionData', {
        method: 'POST',
        body: {}
      })
      if(dataRequest.success && dataRequest.result){
        questionsList.value = dataRequest.result.map((q: any) => ({
          id: q.id,
          owner: q.owner,
          title: q.title,
          requiredSkills: JSON.parse(q.requiredSkills),
          description: q.description,
          attemptedSolutions: q.attemptedSolutions,
          isVisible: !!q.isVisible,
          isSolved: !!q.isSolved
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

  return {
    questionsList, updateQuestionsList,
    fetchQuestionData
  }
};