import { Plugin } from "@opencode/plugin/tui"

const MODE = "local.move-tab"

export default Plugin.define({
  id: "local.move-tab",
  setup(context) {
    let popMode: (() => void) | undefined

    const shift = (delta: -1 | 1) => {
      if (!context.ui.tabs.enabled()) return
      const tabs = context.ui.tabs.list()
      const from = tabs.findIndex((tab) => tab.active)
      if (from < 0) return
      const to = from + delta
      if (to < 0 || to >= tabs.length) return
      context.ui.tabs.move(tabs[from].sessionID, to)
    }

    const exit = () => {
      popMode?.()
      popMode = undefined
    }

    const enter = (delta: -1 | 1) => {
      shift(delta)
      if (popMode || !context.ui.tabs.enabled()) return
      popMode = context.keymap.mode.push(MODE)
      context.ui.toast.show({
        message: "Move tab: < > to move, esc or enter to finish",
        variant: "info",
        duration: 2500,
      })
    }

    context.keymap.layer(() => ({
      mode: "global",
      commands: [
        {
          id: "local.tabs.move.left",
          title: "Move tab left",
          group: "Tabs",
          bind: "<leader>shift+comma,<leader><",
          palette: true,
          run: () => enter(-1),
        },
        {
          id: "local.tabs.move.right",
          title: "Move tab right",
          group: "Tabs",
          bind: "<leader>shift+period,<leader>>",
          palette: true,
          run: () => enter(1),
        },
      ],
    }))

    context.keymap.layer(() => ({
      mode: MODE,
      priority: 20,
      commands: [
        { id: "local.tabs.move.mode.left", title: "Move tab left", bind: "<,shift+comma,comma,left,h", run: () => shift(-1) },
        { id: "local.tabs.move.mode.right", title: "Move tab right", bind: ">,shift+period,period,right,l", run: () => shift(1) },
        { id: "local.tabs.move.mode.exit", title: "Finish moving tab", bind: "escape,return", run: exit },
      ],
    }))

    return exit
  },
})
