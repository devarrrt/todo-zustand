type IGenerate = () => string

export const IDGenerate: IGenerate = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
)
 