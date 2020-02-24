<template>
  <div class="q-pa-md" >

    <!-- [CURRENT TIME] -->
    <div id="ctime">
      <h1 class="header">THE CURRENT TIME</h1>
      <div class="square">
        <div class="digits" id="chr">00</div>
        <div class="text">HR</div>
      </div>
      <div class="square">
        <div class="digits" id="cmin">00</div>
        <div class="text">MIN</div>
      </div>
      <div class="square">
        <div class="digits" id="csec">00</div>
        <div class="text">SEC</div>
      </div>
    </div>

    <!-- [SET ALARM] -->
    <div id="tpick">
      <h1 class="header">
        SET ALARM
      </h1>
      <div id="tpick-h">Gio</div>
      <div id="tpick-m">phut</div>
      <div id="tpick-s">giay</div>
      <div>
        <input type="button" value="Set" id="tset"/>
        <input type="button" value="Reset" id="treset" disabled/>
      </div>
    </div>

    <!-- [ALARM SOUND] -->
    <audio id="alarm-sound" loop>
      <!-- <source src="wake-up-sound.mp3" type="audio/mp3"> -->
      <source src="../../assets/wake-up-sound.mp3" type=""/>
    </audio>

  </div>
</template>

<script>

export default {
    data () {
      return {
        time: '10:56'
    }
  },
  created:function() {
    // INIT - RUN ALARM CLOCK
      window.addEventListener("load", this.init);
  },
  methods: {
      createSel(max) {
      // createSel() : support function - creates a selector for hr, min, sec

        var selector = document.createElement("select");
        for (var i=0; i<=max; i++) {
          var opt = document.createElement("option");
          i = padzero(i);
          opt.value = i;
          opt.innerHTML = i;
          selector.appendChild(opt);
        }
        return selector
      },
    init() {
      // init() : start the alarm clock
        // Get the current time - hour, min, seconds
        var chr = document.getElementById("chr");
        var cmin = document.getElementById("cmin");
        var csec = document.getElementById("csec");

        // The time picker - Hr, Min, Sec
        let thr = createSel(23);
        document.getElementById("tpick-h").appendChild(thr);
        var thm = createSel(59);
        document.getElementById("tpick-m").appendChild(thm);
        var ths = createSel(59);
        document.getElementById("tpick-s").appendChild(ths);

        // The time picker - Set, reset
        var tset = document.getElementById("tset");
        tset.addEventListener("click", set);
        var treset = document.getElementById("treset");
        treset.addEventListener("click", reset);

        // The alarm sound
        var sound = document.getElementById("alarm-sound");

        // Start the clock
        var alarm = null;
        setInterval(tick, 1000);
      },
      padzero : function (num) {
      // padzero() : support function - pads hr, min, sec with 0 if <10

        if (num < 10) { num = "0" + num; }
        else { num = num.toString(); }
        return num;
      },

      tick : function () {
      // tick() : update the current time

        // Current time
        var now = new Date();
        var hr = padzero(now.getHours());
        var min = padzero(now.getMinutes());
        var sec = padzero(now.getSeconds());

        // Update current clock
        chr.innerHTML = hr;
        cmin.innerHTML = min;
        csec.innerHTML = sec;

        // Check and sound alarm
        if (alarm != null) {
          now = hr + min + sec;
          if (now == alarm) {
            if (sound.paused) {
              sound.play();
            }
          }
        }
      },

      // set : function () {
      // // set() : set the alarm

      //   alarm = thr.value + thm.value + ths.value;
      //   thr.disabled = true;
      //   thm.disabled = true;
      //   ths.disabled = true;
      //   tset.disabled = true;
      //   treset.disabled = false;
      // },

      // reset : function () {
      // // reset() : reset the alarm

      //   if (!sound.paused) {
      //     sound.pause();
      //   }
      //   alarm = null;
      //   thr.disabled = false;
      //   thm.disabled = false;
      //   ths.disabled = false;
      //   tset.disabled = false;
      //   treset.disabled = true;
      // }
  }
}
</script>


<style lang="scss" scoped>
#ctime, #tpick {
  font-family: Impact, sans-serif;
}
.header {
  text-align: center;
  font-weight: normal;
  margin: 5px 0 10px 0;
}
/* [CURRENT TIME] */
#ctime {
  margin: 0 auto;
  max-width: 350px;
  padding: 10px;
  background: #000;
  text-align: center;
}
#ctime .header {
  color: #c61d1d;
}
#ctime .square {
  display: inline-block;
  padding: 10px;
  margin: 5px;
}
#ctime .digits {
  font-size: 24px;
  background: #fff;
  color: #000;
  padding: 20px 10px;
  border-radius: 5px;
}
#ctime .text {
  margin-top: 10px;
  color: #ddd;
}
/* [TIME PICKER] */
#tpick {
  margin: 0 auto;
  max-width: 350px;
  padding: 10px;
  background: #f2f2f2;
  white-space: nowrap;
}
#tpick-h, #tpick-m, #tpick-s {
  display: inline-block;
  width: 32%;
}
#tpick select {
  box-sizing: padding-box;
  width: 100%;
  font-size: 1.2em;
  font-weight: bold;
  margin: 20px 0;
}
#tset, #treset {
  box-sizing: padding-box;
  width: 50%;
  background: #3368b2;
  color: #fff;
  padding: 10px;
  border: 0;
  cursor: pointer;
}
#tset:disabled, #treset:disabled {
  background: #aaa;
  color: #888;
}
 
</style>
