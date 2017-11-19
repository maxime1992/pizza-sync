// this abstract class aims to help developers
// to create a new vorpal command in isolation
export abstract class Command {
  abstract titleWithParams: string;
  abstract description: string;
  options: { title: string; description: string }[] | false = false;

  constructor(private _vorpal: any) {}

  getAutocomplete(): string[] | false {
    return false;
  }

  abstract action(
    args: {},
    callback: () => void,
    vorpalContext: { log: (msg: string) => void }
  );

  register(): void {
    const self = this;

    let command = this._vorpal
      .command(this.titleWithParams)
      .description(this.description);

    if (this.getAutocomplete() !== false) {
      command.autocomplete((() => this.getAutocomplete())());
    }

    if (this.options) {
      this.options.forEach(option => {
        command = command.option(option.title, option.description);
      });
    }

    command.action(function(args, callback) {
      const vorpalContext = this;
      self.action(args, callback, vorpalContext);
    });
  }
}
