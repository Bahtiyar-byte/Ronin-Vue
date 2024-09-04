<script lang="ts" setup>
import Crew from "@/components/scheduler/Crew.vue";
import LaborTicketDialogFullscreen from "@/components/scheduler/LaborTicketDialogFullscreen.vue";

const zoomInOut = ref(10);
const bpm = ref(40)
const min = -12
const max = 4

const decrement = () => {
  if (bpm.value > min)
    bpm.value -= 1
}

const increment = () => {
  if (bpm.value < max)
    bpm.value += 1
}
</script>

<template>
  <div class="scheduler__container">
    <div class="top_schedule_header">
      <div class="left__buttons">
        <div class="today__button">
          <VBtn color="primary"> Today </VBtn>
        </div>

        <div class="date_periods">
          <div class="date__period__button__style">
            <VBtn
              variant="outline"
              color="primary"
              icon="tabler-arrow-left"
              rounded
            />
          </div>

          <div class="date__range">
            <div>SEP 02 - SEP 08</div>
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-around;
              "
            >
              <div>2024</div>
              <div>2024</div>
            </div>
          </div>

          <div class="date__period__button__style">
            <VBtn
              variant="outline"
              color="primary"
              icon="tabler-arrow-right"
              rounded
            />
          </div>
        </div>

        <div class="date__zoom">
          <VSlider
            v-model="bpm"
            :color="color"
            :step="1"
            :min="min"
            :max="max"
            :thumb-label="false"
            track-color="secondary"
          >
            <template #prepend>
              <VBtn
                size="small"
                variant="text"
                icon="tabler-minus"
                :color="color"
                @click="decrement"
              />
            </template>

            <template #append>
              <VBtn
                size="small"
                variant="text"
                icon="tabler-plus"
                :color="color"
                @click="increment"
              />
            </template>
          </VSlider>
        </div>
      </div>

      <!-- <div class="right__buttons">
        <div class="today__button">Right</div>
      </div> -->
    </div>

    <div class="main__scheduler">
      <div class="main__scheduler__top">
        <div class="main__scheduler__top__crews">
          <b>CREWS</b>
        </div>

        <div class="main__scheduler__top__dates">
          <div class="main__scheduler__top__dates__single__day">
            <b>MON</b> SEP 2
          </div>
          <div class="main__scheduler__top__dates__single__day">
            <b>TUE</b> SEP 3
          </div>
          <div class="main__scheduler__top__dates__single__day">
            <b>WED</b> SEP 4
          </div>
          <div class="main__scheduler__top__dates__single__day">
            <b>THU</b> SEP 5
          </div>
          <div class="main__scheduler__top__dates__single__day">
            <b>FRI</b> SEP 6
          </div>
          <div class="main__scheduler__top__dates__single__day">
            <b>SAT</b> SEP 7
          </div>
          <div class="main__scheduler__top__dates__single__day">
            <b>SUN</b> SEP 8
          </div>
        </div>
      </div>

      <div class="main__scheduler__bottom">
        <div class="main__scheduler__bottom__trade">
          <!-- <div class="main__scheduler__bottom__trade__crew">
            <div class="main__scheduler__bottom__trade__crew__color__size">
            </div>
            <div>
              CREW 1
            </div>
          </div> -->

          <div
            style="
              max-width: 100px;
              width: 100%;
              padding-right: 3px;
              background: #ebebed;
            "
          >
            <Crew />
            <!-- <Crew /> -->
          </div>

          <div class="main__scheduler__bottom__trade__labor__tickets">
            <!-- <div class="main__scheduler__bottom__trade__title">
              Aluminum/ Flashing
            </div> -->
            <div class="main__scheduler__bottom__trade__content">
              <div
                class="main__scheduler__bottom__trade__content__single__day"
              ></div>
              <div class="main__scheduler__bottom__trade__content__single__day">
                <div class="labor__ticket">
                  <div class="labor__ticket__content">
                    <span class="labor__ticket__trade">Aluminum / Flashing</span>
                    <span class="labor__ticket__name">Evan KENEPP</span>
                  </div>
                  <div class="labor__ticket__details__icon">
                    <LaborTicketDialogFullscreen />
                  </div>
                </div>
              </div>
              <div
                class="main__scheduler__bottom__trade__content__single__day"
              ></div>
              <div
                class="main__scheduler__bottom__trade__content__single__day"
              ></div>
              <div
                class="main__scheduler__bottom__trade__content__single__day"
              ></div>
              <div
                class="main__scheduler__bottom__trade__content__single__day"
              ></div>
              <div
                class="main__scheduler__bottom__trade__content__single__day"
                style="border: 0"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scheduler__container {
  width: 100%;
  /* height: 50px; */
  /* border: 1px solid red; */
  padding-bottom: 20px;
}

.left__buttons {
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* align-items: baseline; */
  max-width: 600px;
  width: 100%;
}

.right__buttons {
  /* border: 1px solid blue; */
  display: flex;
  justify-content: flex-start;
}

.top_schedule_header {
  padding: 10px 15px 10px 15px;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f6f6f4;
}

.date__zoom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.date_periods {
  /* border: 1px solid brown; */
  display: flex;
  flex-direction: row;
  margin-left: 20px;
}

.date__range {
  margin-left: 5px;
  margin-right: 5px;
}

.date__period__button__style {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main__scheduler__top {
  display: flex;
  flex-direction: row;
}

.main__scheduler__top__crews {
  width: 100%;
  max-width: 100px;
  padding: 3px;
  padding-top: 10px;
  background: #ebebed;
}

.main__scheduler__top__dates {
  width: 100%;
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
  position: sticky !important;
  top: 0;
  /*  padding: 10px; */
  z-index: 2000;
}

.main__scheduler__top__dates__single__day {
  width: 14.2%;
  display: flex;
  align-items: center;
  padding-left: 3px;
}

.main__scheduler__bottom__trade__crew {
  width: 100%;
  max-width: 100px;
  padding: 3px;
  display: flex;
  flex-direction: row;
  /* margin-top: 23px; */
}

.main__scheduler__bottom__trade__crew__color__size {
  background: #8bc541;
  width: 14px;
  height: 47px;
  margin-right: 2px;
}

.main__scheduler__bottom__trade {
  display: flex;
  flex-direction: row;
}

.main__scheduler__bottom__trade__labor__tickets {
  border-left: 1px solid gray;
  width: 100%;
}

.main__scheduler__bottom__trade__title {
  padding-left: 10px;
  font-weight: bold;
  background: #ebebed;
  width: 100%;
}

.main__scheduler__bottom__trade__content {
  display: flex;
  flex-direction: row;
}

.main__scheduler__bottom__trade__content__single__day {
  width: 14.2%;
  display: flex;
  border-right: 1px solid gray;
  min-height: 47px;
}

.labor__ticket {
  width: 100%;
  /* height: 23px; */
  /* padding: 2px; */
  background: #8bc541;
  color: #000;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.labor__ticket__content{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.labor__ticket__trade {
  font-size: 0.7em;
}

.labor__ticket__name {
  font-size: 0.7em;
}

.labor__ticket__details__icon {
  display: flex;
  align-items: center;
  max-width: 30px;
  width: 100%;
  background: #edfadc;
}


.date__zoom {
  width: 100%;
  max-width: 200px;
}
</style>
