<template>
  <v-app>
    <v-row class="pa-4">
      <v-col cols="3" class="pr-0">
        <h2 class="My_all_Chats pt-5">Chats</h2>
        <div class="d-flex">
          <img
            src="../assets/qq.jpg"
            width="30"
            height="30"
            class="rounded-circle mr-2 mt-0 mb-5"
          />
          <div class="all_online mt-1 ml-2">
            <h6 class="mb-0">Abd Alrahman</h6>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
              quibusdam voluptatibus sunt dolor, numquam porro, deserunt
              recusandae vel quasi nulla blanditiis maxime temporibus incidunt
              distinctio suscipit architecto rem? Dolor, omnis!
            </div>
          </div>
          <div class="mianColor ml-10 mt-1 d-block">10:54 PM</div>
        </div>
      </v-col>
      <v-col cols="9" class="chating pl-0">
        <div>
          <div>
            <div class="infoPesron">
              <div class="hader_chat pt-2 pl-2 pr-3">
                <div class="d-flex">
                  <v-icon class="mr-3" large>mdi-account</v-icon>
                  <div class="Title">
                    <span>Mido</span>
                    <span class="d-block">Online</span>
                  </div>
                </div>
                <div class="mt-1">
                  <v-icon class="mr-3">mdi-video-outline</v-icon>
                  <v-icon class="mr-3">mdi-phone-outline</v-icon>
                  <v-icon>mdi-plus</v-icon>
                </div>
              </div>
            </div>
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
                  class="contentMessageFrom pa-2 mb-3 d-inline-block rounded-lg"
                >
                  <h6 class="mb-0">Hossm</h6>
                  <div>
                    how are you Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Voluptatibus sequi fugit in earum impedit
                    temporibus debitis atque minus quos quia beatae sapiente
                    ducimus, dolore ipsam perferendis quisquam ab aut! Dolorem?
                  </div>
                </div>
              </div>
              <div class="myMessage d-inline-block pa-2 rounded-lg success">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                perferendis reiciendis distinctio quam, perspiciatis nostrum
                doloribus eius, veniam voluptatem ducimus debitis voluptatum
                maxime nam numquam. Magni excepturi quos labore eaque.
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
        </div>
      </v-col>
    </v-row>
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
.My_all_Chats {
  font-size: 15px;
  height: 50px;
  border-bottom: 1px solid rgb(218, 218, 218);
}
.all_online {
  max-width: 120px;
}
.mianColor {
  color: rgb(140, 140, 140);
}
.chating {
  border-left: 1px solid rgb(218, 218, 218);
}
.infoPesron {
  height: 50px;
  border-bottom: 1px solid rgb(218, 218, 218);
}
.hader_chat {
  display: flex;
  justify-content: space-between;
}
.chat_content {
  overflow-y: scroll;
  // height: 500px;
}
.MessageFrom {
  display: block;
  float: left;
  // background-color: rgb(108, 55, 55);
  width: 100%;
  flex-wrap: wrap;
}
.contentMessageFrom {
  background: rgb(218, 218, 218);
  max-width: 50%;
  width: auto;
}
.myMessage {
  display: block;
  float: right;
  color: white;
  max-width: 70%;
  flex-wrap: wrap;
}
.footer_contianer {
  background: rgb(218, 218, 218);
  height: 45px;
}
</style>