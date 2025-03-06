import { atom } from "recoil"

 const countAtom = atom({
    key: "countAtom",
    default: 30
})

export default countAtom;