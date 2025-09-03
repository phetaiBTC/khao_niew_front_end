export const rulesConcert = {
    startTime: [{
        required: true,
        message: 'ກະລຸນາປ້ອນເວລາເລີ່ມ',
        trigger: 'blur'
    }],
    endTime: [{
        required: true,
        message: 'ກະລຸນາປ້ອນເວລາປິດ',
        trigger: 'blur'
    }],
    price: [{
        required: true,
        message: 'ກະລຸນາປ້ອນລາຄາ',
        trigger: 'blur'
    }],
    limit: [{
        required: true,
        message: 'ກະລຸນາປ້ອນຈໍານວນລູກຄ້າ',
        trigger: 'blur'
    }],
    date: [{
        required: true,
        message: 'ກະລຸນາປ້ອນວັນທີ',
        trigger: 'blur'
    }],
    venueId: [{
        required: true,
        message: 'ກະລຸນາເລືອກສະຖານະ',
        trigger: 'blur'
    }],
    entertainmentIds: [{
        required: true,
        message: 'ກະລຸນາເລືອກຫົວຂໍ້',
        trigger: 'blur'
    }]
}