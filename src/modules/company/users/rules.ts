export const rulesUser = {
    username: [
        { required: true, message: "ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້", trigger: "blur" }
    ],
    email: [
        { required: true, message: "ກະລຸນາປ້ອນອີເມວ", trigger: "blur" },
        { type: "email", message: "ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ", trigger: "blur" },
    ],
    password: [
        { required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານ", trigger: "blur" }
    ],
    phone: [
        { required: true, message: "ກະລຸນາປ້ອນເບີໂທລະສັບ", trigger: "blur" },
        { min: 10, message: "ກະລຸນາປ້ອນເບີໂທລະສັບ", trigger: "blur" },
    ]
};
