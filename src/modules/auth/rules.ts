
export const rules = {
    email: [
        { required: true, message: "ກະລຸນາປ້ອນອີເມວ", trigger: "blur" },
        { type: "email", message: "ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ", trigger: "blur" },
    ],
    password: [
        { required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານ", trigger: "blur" }
    ],
};
