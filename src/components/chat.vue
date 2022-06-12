<template>
  <v-app>
    <v-container class="mt-3">
      <v-row>
        <v-col cols="8">
          <v-card>
            <div class="content">
              <v-card class="header_contianer">
                <div class="hader_chat pt-2 pl-2 pr-3">
                  <div class="d-flex">
                    <v-icon class="mr-3" large>mdi-account</v-icon>
                    <div class="Title">
                      <span>Ahmed</span>
                      <span class="d-block">Online</span>
                    </div>
                  </div>
                  <div class="mt-1">
                    <v-icon class="mr-3">mdi-video-outline</v-icon>
                    <v-icon class="mr-3">mdi-phone-outline</v-icon>
                    <v-icon>mdi-plus</v-icon>
                  </div>
                </div>
              </v-card>
              <div
                class="chat_content pa-2"
                :style="{ height: clientHeight - 176 + 'px' }"
              >
                <!-- height :500 -->
                <div class="MessageFrom">
                  <img
                    src="../assets/qq.jpg"
                    width="30"
                    height="30"
                    class="rounded-circle mr-2 mt-0 mb-5"
                  />
                  <div
                    class="
                      contentMessageFrom
                      pa-2
                      mb-3
                      d-inline-block
                      rounded-lg
                    "
                  >
                    <h6 class="mb-0">Hossm</h6>
                    <div>
                      how are you Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Perspiciatis suscipit, voluptates iste
                      omnis autem hic assumenda, quisquam voluptate quae modi
                      qui repellat! Ut eveniet praesentium id asperiores rem
                      nisi dolores.
                    </div>
                  </div>
                </div>
                <div class="myMessage d-inline-block pa-2 rounded-lg success">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ratione, vero. Corrupti quidem eum nemo. Neque corrupti non
                  tempora vero architecto aut odit voluptates ducimus. Atque
                  perspiciatis molestiae voluptate minus magnam!
                </div>

                <!--  -->

                <!--  -->
                <div class="MessageFrom">hossam</div>
              </div>
              <v-card class="footer_contianer">
                <div class="pa-4">
                  <v-row>
                    <v-col cols="1" class="mt-2">
                      <v-icon small>mdi-phone-hangup</v-icon>
                    </v-col>
                    <v-col cols="10" class="ml-0">
                      <v-text-field
                        dense
                        outlined
                        class="white mb-1"
                        append-icon="mdi-emoticon"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1" class="mt-2">
                      <v-icon class="mr-3" small>mdi-paperclip</v-icon>
                    </v-col>
                  </v-row>
                  <!-- <v-row> </v-row> -->
                </div>
              </v-card>
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <div class="information">
            <v-tabs background-color="transparent" grow>
              <v-tab> ahmed </v-tab>
              <v-tab> mohamed </v-tab>
              <v-tab-item class="pt-2 pl-3 mb-0">
                <h6>Student Details</h6>
                <div class="d-flex mt-3">
                  <img
                    src="../assets/just one.jpeg"
                    width="30"
                    height="30"
                    class="rounded-circle mr-2 mt-0 mb-5"
                  />
                  <div>
                    <h6 class="mb-0">kelly Carroil</h6>
                    <p class="mt-0 mb-0 mianColor">US</p>
                  </div>
                </div>
                <hr class="mt-1 mb-2" />
                <h6>Teacher Details</h6>

                <div class="d-flex mt-3">
                  <img
                    src="../assets/person2.jpg"
                    width="30"
                    height="30"
                    class="rounded-circle mr-2 mt-0 mb-5"
                  />
                  <div>
                    <h6 class="mb-0">kelly Carroil</h6>
                    <p class="mt-0 mianColor">US</p>
                  </div>
                </div>
                <hr class="mt-1 mb-2" />
                <div>
                  <h6>Lesson Details</h6>
                  <div class="d-flex">
                    <span class="mianColor mr-6">US</span>
                    <div>
                      <h6>12:30PM - 01:30PM</h6>
                      <p>Friday, August 23, 2021</p>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="mianColor mr-6">
                      <p class="mb-0">Status</p>
                      <p>Details</p>
                    </div>

                    <div>
                      <p class="mb-0">Scheduiled</p>
                      <p class="mb-0">English</p>
                      <p class="mb-0">60 Minutes Of Lesson</p>
                    </div>
                  </div>
                </div>
                <hr class="mt-1 mb-2" />
                <div class="d-flex justify-content-around">
                  <v-btn class="black white--text">00:00:39:16</v-btn>
                  <v-btn class="success">End Lesson</v-btn>
                </div>
              </v-tab-item>
              <v-tab-item>
                <p>two</p>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <hr />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clientHeight: null,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.clientHeight = window.innerHeight;
      console.log("height is ", window.innerHeight);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-size: 10px;
}
.hader_chat {
  display: flex;
  justify-content: space-between;
}
.mianColor {
  color: rgb(140, 140, 140);
}
.Title {
  font-size: 13px;
}
.header_contianer {
  background: rgb(218, 218, 218);
  height: 50px;
}
.MessageFrom {
  display: block;
  float: left;
  // background-color: rgb(108, 55, 55);
  width: 100%;
  flex-wrap: wrap;
}
.myMessage {
  display: block;
  float: right;
  color: white;
  max-width: 70%;
  flex-wrap: wrap;
}
.chat_content {
  overflow-y: scroll;
  // height: 500px;
}
.contentMessageFrom {
  background: rgb(218, 218, 218);
  max-width: 50%;
  width: auto;
}
.footer_contianer {
  background: rgb(218, 218, 218);
  height: 45px;
}
.information {
  font-size: 10px;
}
</style>