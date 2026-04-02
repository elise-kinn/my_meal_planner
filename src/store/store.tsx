import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type userStore = {
    id_user: number| null
    username :string|null
    token: string | null

    setUsername: (username:string) => void
    setId: (id_user:number) => void
    setToken: (user:string) => void

    isAuthenticated: () => boolean
    logout: () => void
}

type tokenProp = {
    id_user : number, 
    username: string,
    exp: number
}

type viewStore = {
    currentPage: string 
    setCurrentPage: (currentPage:string) => void
    mealsPlanned: MealsProp[]
    setMealsPlanned: (mealsPlanned:MealsProp[]) => void
}

type MealsProp = {
    name_meal:string
    date:string
    type_meal:string
}

// Donnée partagée ??
// Donnée doit survivre à la navigation ?
// Qui modifie quoi ?

export const useUser = create<userStore>()(
    persist(
        (set, get) => ({

            id_user: null, 
            username: null, 
            token: null, 

            setId: (id_user) => set({ id_user }),
            setUsername: (username) => set({ username }), 
            setToken: (token) => set({ token }),

            isAuthenticated: () => {
                const token = get().token
                if(!token) return false

                try {
                    const decoded = jwtDecode<tokenProp>(token)
                    const currentTime = Date.now() / 1000
                    return decoded.exp > currentTime
                } catch {
                    return false
                }
            },

            logout: () => set({
                id_user: null,
                username : null,
                token: null
            })

        }), {name: 'auth-storage'}
    )
)

export const useView = create<viewStore>()(
    (set) => ({
        currentPage: "Planning",
        setCurrentPage: (currentPage) => set({ currentPage }),

        mealsPlanned:[],
        setMealsPlanned: (mealsPlanned) => set({mealsPlanned})
    })
)