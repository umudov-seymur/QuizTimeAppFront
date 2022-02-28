<template>
  <div class="flex flex-col">
    <section class="hero-3 relative overflow-hidden flex bg-white pt-8 lg:pt-0">
      <div class="absolute inset-0">
        <div class="bottom-ribbon"></div>
      </div>
      <Container>
        <div class="w-full flex flex-wrap h-full relative">
          <div class="w-full lg:w-2/4 pt-0 lg:pt-20">
            <div
              class="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left"
            >
              <h2 class="text-3xl lg:text-4xl mb-4 font-quicksand font-bold">
                Tələbələrin tərəqqisini izləmək üçün
                <span class="text-purple-500">etibarlı köməkçi </span>
              </h2>
              <p class="text-gray-500 font-quicksand font-medium">
                Find and create free gamified quizzes and interactive lessons to
                engage any learner.
              </p>
            </div>
            <div class="text-center flex lg:text-left">
              <a
                href="#key-features"
                class="tracking-wide font-quicksand mr-3 uppercase text-base bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-8 border-b-4 border-purple-700 hover:border-purple-500 rounded transition duration-300"
              >
                Başla
              </a>
              <a
                class="tracking-wide font-quicksand mr-3 uppercase text-base bg-gray-200 hover:bg-gray-400 text-dark font-bold py-3 px-8 border-b-4 border-gray-300 hover:border-gray-300 rounded transition duration-300"
                href="#how-we-work"
              >
                How We Work?
              </a>
            </div>
          </div>
          <div
            class="w-full lg:w-2/4 relative lg:absolute right-0 bottom-0"
            :style="{ width: '680px' }"
          >
            <img
              :src="require('@/assets/images/hero-bg.png')"
              class="pointer-events-none"
              alt
            />
          </div>
        </div>
      </Container>
    </section>
    <section class="py-20 bg-gray-100" id="key-features">
      <Container>
        <div>
          <div class="max-w-lg mx-auto mb-12 text-center">
            <h2 class="my-2 text-3xl md:text-4xl font-bold font-quicksand">
              Bizim
              <span class="text-purple-500"> Üstünlüklərimiz </span>
            </h2>
            <p class="leading-relaxed font-quicksand">
              Business solution company sit our any how site used the our
              company any site us it-solve theme is very professional
            </p>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
              <div
                class="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg transition duration-500"
              >
                <div class="text-purple-500 mx-auto mb-4">
                  <svg
                    class="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <h3 class="mb-2 font-bold font-quicksand">IT Consultancy</h3>
                <p class="text-sm text-blueGray-400">
                  We believe brand interaction is key to communication. Real
                  innovations and positive customer experience are the heart of
                  success.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
              <div
                class="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-md transition duration-500"
              >
                <div class="text-purple-500 mx-auto mb-4">
                  <svg
                    class="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="mb-2 font-bold font-quicksand">Web Development</h3>
                <p class="text-sm">
                  We believe brand interaction is key to communication. Real
                  innovations and positive customer experience are the heart of
                  success.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
              <div
                class="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg transition duration-500"
              >
                <div class="text-purple-500 mx-auto mb-4">
                  <svg
                    class="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="mb-2 font-bold font-quicksand">App Development</h3>
                <p class="text-sm text-blueGray-400">
                  We believe brand interaction is key to communication. Real
                  innovations and positive customer experience are the heart of
                  success.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
              <div
                class="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg transition duration-500"
              >
                <div class="text-purple-500 mx-auto mb-4">
                  <svg
                    class="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    ></path>
                  </svg>
                </div>
                <h3 class="mb-2 font-bold font-quicksand">Digital Marketing</h3>
                <p class="text-sm text-blueGray-400">
                  We believe brand interaction is key to communication. Real
                  innovations and positive customer experience are the heart of
                  success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  </div>
</template>

<script>
import Container from "@/components/shared/Container";

export default {
  name: "Home",
  components: { Container },
};
</script>

<style scoped>
.bottom-ribbon {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 240px;
  transform: skewY(-3deg) translateY(56px);
  background-color: rgba(255, 164, 2, 0.2);
  opacity: 0.5;
}

.hero-3 {
  min-height: 680px;
  max-height: 100%;
}
</style>
