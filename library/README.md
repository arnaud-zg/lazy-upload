<h1 align="center">Welcome to lazy-upload 👋</h1>

<p>lazy-upload is a library which aims to simplify the file upload flow</p>

<p>
  <a href="https://www.npmjs.com/package/lazy-upload" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/lazy-upload.svg">
  </a>
  <img alt="Commit Activity" src="https://img.shields.io/github/commit-activity/m/arnaud-zg/lazy-upload" />
  <a href="https://travis-ci.org/arnaud-zg/lazy-upload" target="_blank">
    <img alt="Build Status" src="https://travis-ci.org/arnaud-zg/lazy-upload.svg?branch=develop" />
  </a>
  <a href="https://bundlephobia.com/result?p=lazy-upload" target="_blank">
    <img alt="Bundle Size" src="https://badgen.net/bundlephobia/min/lazy-upload" />
  </a>
</p>

### Installing

Using npm:

```shell
npm i --save lazy-upload
```

Using yarn:

```shell
yarn add --dev lazy-upload
```

## Usage

Here are examples of how you can use `lazy-upload`.

### useLazyUpload

> File upload hook

#### Examples

##### Basic

```ts
const UPLOAD_FILES_URL = '';

export const UploadField = () => {
  const {
    acceptedFiles,
    attributes,
    rejectedFiles,
    reset,
    upload,
    uploadedFiles,
  } = useLazyUpload({});
  console.log({ rejectedFiles, uploadedFiles });
  return (
    <form
      onSubmit={e => {
        upload({
          config: {
            url: UPLOAD_FILES_URL,
            method: 'POST',
          },
          fileList: acceptedFiles,
        });
        e.preventDefault();
      }}
    >
      <label htmlFor="file-upload">Choose files:</label>
      <input {...attributes} id="file-upload" name="file-upload" />
      <button onClick={reset}>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Running the tests

Tests are written with jest

### Unit tests

Using jest:

```shell
yarn run test
```

## Deployment

Deployment is done with Travis.

## Built With

- [TSDX](https://github.com/palmerhq/tsdx) - TSDX
- [Storybook](https://github.com/storybookjs/storybook) - Storybook

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/arnaud-zg/lazy-upload/tags).

## Authors

- **Arnaud Zheng** - _Initial work_ - [arnaud-zg](https://github.com/arnaud-zg)

See also the list of [contributors](https://github.com/arnaud-zg/lazy-upload/graphs/contributors) who participated in this project.

## Show your support

Give a ⭐️ if this project helped you!

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details
