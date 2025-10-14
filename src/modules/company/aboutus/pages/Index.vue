<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50">

        <div class="relative overflow-hidden bg-cover bg-center py-32 transition-all duration-1000"
            :style="`background-image: url('${images[currentImage]}')`">
            <div class="absolute inset-0 bg-black opacity-60"></div>

            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center text-white">
                    <a-badge count="ກ່ຽວກັບພວກເຮົາ" :number-style="{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: '#fff',
                        fontSize: '14px',
                        padding: '0 20px',
                        marginBottom: '20px',
                    }" />
                    <h1 class="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                        ເມື່ອສິນລະປະພົບກັບຄວາມຝັນ
                    </h1>
                    <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        ພວກເຮົາແມ່ນຄະນະລະຄອນທີ່ມີແຮງບັນດານໃຈ ໃນການສ້າງຄວາມຮູ້ສຶກ
                        ແລະສົ່ງຕໍ່ຄວາມໝາຍຜ່ານການແສດງທີ່ມີຊີວິດຊີວາ.
                    </p>
                </div>
            </div>
        </div>

        <!-- Mission & Vision -->
        <div class="container mx-auto px-4 py-20">
            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <a-card hoverable
                    class="rounded-2xl shadow-lg border-0 transform hover:-translate-y-2 transition-all duration-300">
                    <template #cover>
                        <div class="bg-gradient-to-br from-yellow-500 to-red-600 p-8 text-center">
                            <div class="text-6xl mb-4">🎭</div>
                            <h3 class="text-2xl font-bold text-white">ພັນທະກິດຂອງພວກເຮົາ</h3>
                        </div>
                    </template>
                    <p class="text-gray-700 text-lg leading-relaxed">
                        ສ້າງພື້ນທີ່ທາງສິນລະປະ ໃຫ້ທຸກຄົນໄດ້ຮູ້ສຶກ ແລະຄິດຕໍ່ກັບຊີວິດຜ່ານການແສດງທີ່ມີແນວຄວາມຄິດ.
                    </p>
                </a-card>

                <a-card hoverable
                    class="rounded-2xl shadow-lg border-0 transform hover:-translate-y-2 transition-all duration-300">
                    <template #cover>
                        <div class="bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-center">
                            <div class="text-6xl mb-4">✨</div>
                            <h3 class="text-2xl font-bold text-white">ວິໄສທັດ</h3>
                        </div>
                    </template>
                    <p class="text-gray-700 text-lg leading-relaxed">
                        ເປັນຄະນະລະຄອນທີ່ສົ່ງຜົນງານທີ່ສ້າງແຮງບັນດານໃຈ ແລະກະຕຸ້ນຈິນຕະນາການໃຫ້ກັບຜູ້ຊົມ.
                    </p>
                </a-card>
            </div>
        </div>

        <!-- Team -->
        <div class="container mx-auto px-4 py-20">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">ທີມງານລະຄອນຂອງພວກເຮົາ</h2>
                <p class="text-xl text-gray-600">
                    ຄົນເບື້ອງຫຼັງແສງສະຫວ່າງ ແລະສຽງປະກາຍບົດລະຄອນ.
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <a-card v-for="member in team" :key="member.name" hoverable
                    class="rounded-2xl shadow-lg border-0 text-center transform hover:-translate-y-2 transition-all duration-300">
                    <a-avatar :size="120" class="mb-4 mx-auto" :style="{ backgroundColor: member.color }">
                        <template #icon>
                            <span class="text-5xl">{{ member.emoji }}</span>
                        </template>
                    </a-avatar>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ member.name }}</h3>
                    <a-tag :color="member.tagColor" class="mb-3">{{ member.position }}</a-tag>
                    <p class="text-gray-600 mt-3">{{ member.description }}</p>
                </a-card>
            </div>
        </div>

        <!-- Values -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">ຈິດວິນຍານຂອງພວກເຮົາ</h2>
                </div>

                <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <a-card v-for="value in values" :key="value.title"
                        class="rounded-xl border-0 shadow-md hover:shadow-xl transition-all duration-300">
                        <div class="text-center">
                            <div class="text-5xl mb-4">{{ value.icon }}</div>
                            <h4 class="text-xl font-bold text-gray-800 mb-3">{{ value.title }}</h4>
                            <p class="text-gray-600">{{ value.description }}</p>
                        </div>
                    </a-card>
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div class="container mx-auto px-4 py-20">
            <div
                class="bg-gradient-to-r border-2 border-blue-500  rounded-3xl p-12 text-center text-blue-900 shadow-2xl">
                <h2 class="text-4xl font-bold mb-4">ມາເປັນສ່ວນໜຶ່ງຂອງການແສດງຄັ້ງຕໍ່ໄປ!</h2>
                <p class="text-xl mb-8">ຮ່ວມສ້າງຄວາມມະຫັດສະຈັນໃນໂລກລະຄອນກັບພວກເຮົາ.</p>
                <a-space :size="16">

                    <a-button size="large" @click="router.push({ name: 'company.concert' })"
                        class="bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-700 font-semibold px-8 h-12">
                        ເບິ່ງຕາຕະລາງການແສດງ
                    </a-button>
                </a-space>
            </div>
        </div>

        <div class="contact-page bg-gray-50 min-h-screen py-20">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">ຕິດຕໍ່ພວກເຮົາ</h1>
                    <p class="text-lg md:text-xl text-gray-600">ພວກເຮົາຍິນດີຮັບຟັງຄຳເຫັນ ແລະ ຂໍ້ແນະນຳຈາກທ່ານ</p>
                </div>

                <div class="grid md:grid-cols-2 gap-12">
                    <div class="space-y-8">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-6">ຂໍ້ມູນການຕິດຕໍ່</h2>

                        <div class="space-y-4">
                            <div class="flex items-start gap-4">
                                <div class="text-3xl">📍</div>
                                <div>
                                    <h3 class="font-semibold text-gray-700">ທີ່ຢູ່</h3>
                                    <p class="text-gray-600">123 ຖະໜົນສຸຂຸມວິດ, ແຂວງຄອງເທີນ<br>ເມືອງຄອງເທີນ, ກຸງເທບ
                                        10110</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="text-3xl">📧</div>
                                <div>
                                    <h3 class="font-semibold text-gray-700">ອີເມວ</h3>
                                    <p><a href="mailto:contact@example.com"
                                            class="text-blue-600 hover:underline">contact@example.com</a></p>
                                    <p><a href="mailto:support@example.com"
                                            class="text-blue-600 hover:underline">support@example.com</a></p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="text-3xl">📞</div>
                                <div>
                                    <h3 class="font-semibold text-gray-700">ເບີໂທ</h3>
                                    <p><a href="tel:0212345678" class="text-blue-600 hover:underline">02-123-4567</a>
                                    </p>
                                    <p><a href="tel:0898765432" class="text-blue-600 hover:underline">089-876-5432</a>
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="text-3xl">🕐</div>
                                <div>
                                    <h3 class="font-semibold text-gray-700">ເວລາເປີດບໍລິການ</h3>
                                    <p class="text-gray-600">ຈັນ - ສຸກ: 9:00 - 18:00 ນ.</p>
                                    <p class="text-gray-600">ເສົາ - ອາທິດ: ປິດບໍລິການ</p>
                                </div>
                            </div>
                        </div>

                        <!-- Social Media -->
                        <div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-4">ຕິດຕາມພວກເຮົາໄດ້ທີ່</h3>
                            <div class="flex gap-4">
                                <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                                </a>
                                <a href="#" class="text-blue-400 hover:text-blue-600 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                                </a>
                                <a href="#" class="text-green-500 hover:text-green-700 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                                </a>
                                <a href="#" class="text-pink-500 hover:text-pink-700 transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-lg w-full text-center">
                        <h3 class="text-xl font-semibold text-gray-800 py-4">ຕິດຕາມພວກເຮົາໄດ້ທີ່</h3>
                        <div class="flex gap-15 justify-center w-full">
                            <!-- Facebook -->
                            <a href="#" aria-label="Facebook"
                                class="  hover:scale-110 transform transition-all duration-300 shadow-md">
                                <img src="/src/assets/images/facebook.png" alt="Facebook"
                                    class="w-15 h-15 object-contain " />
                                Facebook
                            </a>

                            <!-- Email -->
                            <a href="#" aria-label="Email"
                                class="  hover:scale-110 transform transition-all duration-300 shadow-md">
                                <img src="/src/assets/images/email.webp" alt="Email"
                                    class="w-15 h-15 object-contain" />Email
                            </a>

                            <!-- WhatsApp -->
                            <a href="#" aria-label="WhatsApp"
                                class="  hover:scale-110 transform transition-all duration-300 shadow-md">
                                <img src="/src/assets/images/whatsapps.png" alt="WhatsApp"
                                    class="w-15 h-15 object-contain" />WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const images = [
    "/src/assets/images/1.jpg",
    "/src/assets/images/2.jpg",
    "/src/assets/images/3.jpg",

];
const currentImage = ref(0);
let interval: number | null = null;

onMounted(() => {
    interval = setInterval(() => {
        currentImage.value = (currentImage.value + 1) % images.length;
    }, 5000);
});
onUnmounted(() => clearInterval(interval as number));

const team = ref([
    { name: "ໂຕ່ຂ້າວເນືອ", position: "ຜູ້ອຳນວຍການ", emoji: "🎬", color: "#d46b08", tagColor: "orange", description: "ຜູ້ກຳກັບທີ່ເຊື່ອວ່າທຸກຄຳເວົ້າມີຊີວິດ." },
    { name: "ຫອຍແຕ່ງ", position: "ນັກແສດງນຳ", emoji: "🎭", color: "#722ed1", tagColor: "purple", description: "ສາຍໃຈໃນການຖ່າຍທອດຄວາມຮູ້ສຶກຜ່ານບົດລະຄອນ." },
    { name: "ຂ້າວເຫລັກ", position: "ຜູ້ອອກແບບສະເຫຼີມ", emoji: "🎨", color: "#eb2f96", tagColor: "magenta", description: "ສ້າງສະຫຼຸບການມອງໃໝ່ໃຫ້ກັບທຸກຊາກຂອງລະຄອນ." },
]);

const values = ref([
    { icon: "🎭", title: "ສິນລະປະ", description: "ສິນລະປະແມ່ນພາສາສາກົນທີ່ບໍ່ຕ້ອງໃຊ້ຄຳສັບ." },
    { icon: "💫", title: "ແຮງບັນດານໃຈ", description: "ເຮັດດ້ວຍຫົວໃຈ ເພາະຄວາມຮູ້ສຶກແມ່ນພະລັງງານທີ່ສົ່ງຕໍ່." },
    { icon: "🤝", title: "ການຮ່ວມມື", description: "ທຸກການສະແດງຈະສຳເລັດໄດ້ ເມື່ອພວກເຮົາເຮັດງານເປັນທີມ." },
    { icon: "💡", title: "ຄວາມຄິດສ້າງສັນ", description: "ຄວາມຄິດໃໝ່ເຮັດໃຫ້ການສະແດງທຸກຄັ້ງບໍ່ຊ້ຳ." },
    { icon: "❤️", title: "ຄວາມຮູ້ສຶກ", description: "ຫົວໃຈຂອງລະຄອນແມ່ນຄວາມຮູ້ສຶກຈິງໆ." },
    { icon: "🌟", title: "ຄຸນນະພາບ", description: "ທຸກຊາກຕ້ອງມີຄວາມເປັນຈິງ ແລະມີຄວາມໝາຍ." },
]);
</script>


<style scoped>
div[style*="background-image"] {
    transition: background-image 1s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.container {
    animation: fadeIn 0.6s ease-out;
}
</style>