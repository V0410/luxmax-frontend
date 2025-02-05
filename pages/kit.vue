<template>
  <div class="gridClass my-20">
    <h1 class="underline text-2xl my-10">Button</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:my-6 w-fit">
        <BaseButton text="Button Title" size="l" />
        <BaseButton text="Button Title" size="l" :isLoading="true" />
        <BaseButton text="Button Title" size="l" :isDisabled="true" />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton styleType="outlined" text="Button Title" size="l" />
        <BaseButton
          styleType="outlined"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          styleType="outlined"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton styleType="text" text="Button Title" size="l" />
        <BaseButton
          styleType="text"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          styleType="text"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <!-- start with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="l"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="l"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="l"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <!-- end with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="l"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="l"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="l"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="l"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="l"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:my-6 w-fit">
        <BaseButton text="Button Title" size="m" />
        <BaseButton text="Button Title" size="m" :isLoading="true" />
        <BaseButton text="Button Title" size="m" :isDisabled="true" />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton styleType="outlined" text="Button Title" size="m" />
        <BaseButton
          styleType="outlined"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          styleType="outlined"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton styleType="text" text="Button Title" size="m" />
        <BaseButton
          styleType="text"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          styleType="text"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
      <!-- start with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="m"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="m"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="m"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
      <!-- end with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="m"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="m"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="m"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="m"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="m"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:my-6 w-fit">
        <BaseButton text="Button Title" size="s" />
        <BaseButton text="Button Title" size="s" :isLoading="true" />
        <BaseButton text="Button Title" size="s" :isDisabled="true" />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton styleType="outlined" text="Button Title" size="s" />
        <BaseButton
          styleType="outlined"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          styleType="outlined"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton styleType="text" text="Button Title" size="s" />
        <BaseButton
          styleType="text"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          styleType="text"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <!-- start with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="s"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="s"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="s"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          startIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <!-- end with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="s"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="s"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="outlined"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <div class="[&>*]:my-6 w-fit">
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="s"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="s"
          :isLoading="true"
        />
        <BaseButton
          endIcon="IconArrowCircleRight"
          styleType="text"
          text="Button Title"
          size="s"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Tag</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:my-6 w-fit">
        <BaseTag text="Tag Title" size="l" />
        <BaseTag text="Tag Title" size="l" :isDisabled="true" />
      </div>
      <!-- start with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseTag startIcon="IconCalendar" text="Tag Title" size="l" />
        <BaseTag
          startIcon="IconCalendar"
          text="Tag Title"
          size="l"
          :isDisabled="true"
        />
      </div>
      <!-- has close -->
      <div class="[&>*]:my-6 w-fit">
        <BaseTag hasClose text="Tag Title" size="l" />
        <BaseTag hasClose text="Tag Title" size="l" :isDisabled="true" />
      </div>
      <!-- start with icon && has close -->
      <div class="[&>*]:my-6 w-fit">
        <BaseTag startIcon="IconCalendar" hasClose text="Tag Title" size="l" />
        <BaseTag
          startIcon="IconCalendar"
          hasClose
          text="Tag Title"
          size="l"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:my-6 w-fit">
        <BaseTag text="Tag Title" size="s" />
        <BaseTag text="Tag Title" size="s" :isDisabled="true" />
      </div>
      <!-- start with icon -->
      <div class="[&>*]:my-6 w-fit">
        <BaseTag startIcon="IconCalendar" text="Tag Title" size="s" />
        <BaseTag
          startIcon="IconCalendar"
          text="Tag Title"
          size="s"
          :isDisabled="true"
        />
      </div>
      <!-- has close -->
      <div class="[&>*]:my-6 w-fit">
        <BaseTag hasClose text="Tag Title" size="s" />
        <BaseTag hasClose text="Tag Title" size="s" :isDisabled="true" />
      </div>
      <!-- start with icon && has close -->
      <div class="[&>*]:my-6 w-fit">
        <BaseTag startIcon="IconCalendar" hasClose text="Tag Title" size="s" />
        <BaseTag
          startIcon="IconCalendar"
          hasClose
          text="Tag Title"
          size="s"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Alert</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:my-6 w-fit">
        <BaseAlert
          type="success"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
        <BaseAlert
          type="warning"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
        <BaseAlert
          type="danger"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
        <BaseAlert
          type="info"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
      </div>
      <!-- with button -->
      <div class="[&>*]:my-6 w-fit">
        <BaseAlert
          buttonText="Button Title"
          type="success"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
        <BaseAlert
          buttonText="Button Title"
          type="warning"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
        <BaseAlert
          buttonText="Button Title"
          type="danger"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
        <BaseAlert
          buttonText="Button Title"
          type="info"
          title="Title"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed."
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInput
          label="Label text"
          name="4"
          size="l"
          placeholder="Input text"
        />
        <BaseInput
          type="password"
          label="Label text"
          name="5"
          size="l"
          placeholder="Input text"
        />
        <BaseInput
          label="Label text"
          name="6"
          size="l"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInput
          label="Label text"
          name="7"
          size="m"
          placeholder="Input text"
        />
        <BaseInput
          type="password"
          label="Label text"
          name="8"
          size="m"
          placeholder="Input text"
        />
        <BaseInput
          label="Label text"
          name="9"
          size="m"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInput
          label="Label text"
          name="10"
          size="s"
          placeholder="Input text"
        />
        <BaseInput
          type="password"
          label="Label text"
          name="11"
          size="s"
          placeholder="Input text"
        />
        <BaseInput
          label="Label text"
          name="12"
          size="s"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Dropdown Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDropdown
          name="1"
          label="Label text"
          size="l"
          :options="dropdownOptions"
          placeholder="Input text"
        />
        <BaseInputDropdown
        name="2"
          label="Label"
          size="l"
          :options="dropdownOptions"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDropdown
        name="3"
          label="Label text"
          size="m"
          :options="dropdownOptions"
          placeholder="Input text"
        />
        <BaseInputDropdown
        name="4"
          label="Label text"
          size="m"
          :options="dropdownOptions"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDropdown
        name="5"
          label="Label text"
          size="s"
          :options="dropdownOptions"
          placeholder="Input text"
        />
        <BaseInputDropdown
        name="6"
          label="Label text"
          size="s"
          :options="dropdownOptions"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Date Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDate label="Label text" size="l" placeholder="Input text" />
        <BaseInputDate
          label="Label text"
          size="l"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDate label="Label text" size="m" placeholder="Input text" />
        <BaseInputDate
          label="Label text"
          size="m"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDate label="Label text" size="s" placeholder="Input text" />
        <BaseInputDate
          label="Label text"
          size="s"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Dropdown Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDropdown
          label="Label text"
          size="l"
          :options="dropdownOptions"
          placeholder="Input text"
        />
        <BaseInputDropdown
          label="Label text"
          size="l"
          :options="dropdownOptions"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDropdown
          label="Label text"
          size="m"
          :options="dropdownOptions"
          placeholder="Input text"
        />
        <BaseInputDropdown
          label="Label text"
          size="m"
          :options="dropdownOptions"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputDropdown
          label="Label text"
          size="s"
          :options="dropdownOptions"
          placeholder="Input text"
        />
        <BaseInputDropdown
          label="Label text"
          size="s"
          :options="dropdownOptions"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Search Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputSearch label="Label text" size="l" placeholder="Input text" />
        <BaseInputSearch
          label="Label text"
          size="l"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputSearch label="Label text" size="m" placeholder="Input text" />
        <BaseInputSearch
          label="Label text"
          size="m"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputSearch label="Label text" size="s" placeholder="Input text" />
        <BaseInputSearch
          label="Label text"
          size="s"
          placeholder="Input text"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Phone Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputPhone label="Label text" size="l" />
        <BaseInputPhone
          label="Label text"
          size="l"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputPhone label="Label text" size="m" />
        <BaseInputPhone
          label="Label text"
          size="m"
          :isDisabled="true"
        />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputPhone label="Label text" size="s" />
        <BaseInputPhone
          label="Label text"
          size="s"
          :isDisabled="true"
        />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Radio Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputRadio size="l" />
        <BaseInputRadio size="l" :hasIcon="true" />
        <BaseInputRadio size="l" :isDisabled="true" />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputRadio size="m" />
        <BaseInputRadio size="m" :hasIcon="true" />
        <BaseInputRadio size="m" :isDisabled="true" />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputRadio size="s" />
        <BaseInputRadio size="s" :hasIcon="true" />
        <BaseInputRadio size="s" :isDisabled="true" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Checkbox Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputCheckbox size="l" />
        <BaseInputCheckbox size="l" :hasIcon="true" />
        <BaseInputCheckbox size="l" :hasIcon="true" :allSelected="true" />
        <BaseInputCheckbox size="l" :isDisabled="true" />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputCheckbox size="m" />
        <BaseInputCheckbox size="m" :hasIcon="true" />
        <BaseInputCheckbox size="m" :hasIcon="true" :allSelected="true" />
        <BaseInputCheckbox size="m" :isDisabled="true" />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputCheckbox size="s" />
        <BaseInputCheckbox size="s" :hasIcon="true" />
        <BaseInputCheckbox size="s" :hasIcon="true" :allSelected="true" />
        <BaseInputCheckbox size="s" :isDisabled="true" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Switch Input</h1>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputSwitch size="l" />
        <BaseInputSwitch size="l" :hasIcon="true" />
        <BaseInputSwitch size="l" :isDisabled="true" />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseInputSwitch size="s" />
        <BaseInputSwitch size="s" :hasIcon="true" />
        <BaseInputSwitch size="s" :isDisabled="true" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Pagination</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BasePagination :totalPages="10"  />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Breadcrumb</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseBreadcrumb :dataArray="breadcrumbDataArray" />
        <BaseBreadcrumb :dataArray="breadcrumbData2Array" />
        <BaseBreadcrumb :dataArray="breadcrumbDataArray" :hasBg="true" />
        <BaseBreadcrumb :dataArray="breadcrumbData2Array" :hasBg="true" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Avatar</h1>
    <h2>XL size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseAvatar size="xl" />
        <BaseAvatar size="xl" :isAdd="true" />
        <BaseAvatar size="xl" :name="{first: 'Behdad', last: 'Barzegar'}"/>
        <BaseAvatar size="xl" img="/img/temp/profile.webp" />
        <BaseAvatar size="xl" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="true" />
        <BaseAvatar size="xl" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" text="Experienced guide" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="false" />
      </div>
    </div>
    <h2>L size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseAvatar size="l" />
        <BaseAvatar size="l" :isAdd="true" />
        <BaseAvatar size="l" :name="{first: 'Behdad', last: 'Barzegar'}"/>
        <BaseAvatar size="l" img="/img/temp/profile.webp" />
        <BaseAvatar size="l" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="true" />
        <BaseAvatar size="l" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" text="Experienced guide" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="false" />
      </div>
    </div>
    <h2>M size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseAvatar size="m" />
        <BaseAvatar size="m" :isAdd="true" />
        <BaseAvatar size="m" :name="{first: 'Behdad', last: 'Barzegar'}"/>
        <BaseAvatar size="m" img="/img/temp/profile.webp" />
        <BaseAvatar size="m" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="true" />
        <BaseAvatar size="m" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" text="Experienced guide" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="false" />
      </div>
    </div>
    <h2>S size</h2>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-fit">
        <BaseAvatar size="s" />
        <BaseAvatar size="s" :isAdd="true" />
        <BaseAvatar size="s" :name="{first: 'Behdad', last: 'Barzegar'}"/>
        <BaseAvatar size="s" img="/img/temp/profile.webp" />
        <BaseAvatar size="s" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="true" />
        <BaseAvatar size="s" img="/img/temp/profile.webp" :name="{first: 'Behdad', last: 'Barzegar'}" text="Experienced guide" :hasDetails="true" :hasOnlineOrOffline="true" :isOnline="false" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Table</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-full">
        <BaseTable :headers="tableHeaders" :data="tableData" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Tooltip</h1>
    <div class="my-10 flex gap-10 flex-wrap bg-t1">
      <div class="[&>*]:m-6 w-fit">
        <BaseTooltip type="bottom-left" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="bottom-center" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="bottom-right" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
      </div>
      <div class="[&>*]:m-6 w-fit">
        <BaseTooltip type="top-left" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="top-center" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="top-right" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
      </div>
      <div class="[&>*]:m-6 w-fit">
        <BaseTooltip type="right-top" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="right-center" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="right-bottom" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
      </div>
      <div class="[&>*]:m-6 w-fit">
        <BaseTooltip type="left-top" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="left-center" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
        <BaseTooltip type="left-bottom" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt." />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Tab</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-1/2">
        <BaseTab :data="tabData" />
        <BaseTab :data="tabData" :isFullWidth="true" />
        <BaseTab :data="tabData2" />
        <BaseTab :data="tabData2" :isFullWidth="true" />
        <BaseTab :data="tabData3" />
        <BaseTab :data="tabData3" :isFullWidth="true" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Stepper</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-1/2">
        <BaseStepper :steps="stepperData" :currentStep="0" />
        <BaseStepper :steps="stepperData" :currentStep="1" />
        <BaseStepper :steps="stepperData" :currentStep="2" />
      </div>
      <div class="[&>*]:m-6 w-1/2">
        <BaseStepper :steps="stepperData2" :currentStep="0" />
        <BaseStepper :steps="stepperData2" :currentStep="1" />
        <BaseStepper :steps="stepperData2" :currentStep="2" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Item Card</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-1/2">
        <BaseItemCard condition="Great Condition" img="/img/temp/itemProduct.webp" price="£1,200" name="Dasein Women Handbags Top Handle Satchel Purse Shoulder Bag Hobo Bag Work Bag Set 2pcs" shortName="Vera Bradley Cotton Frannie Crescent Crossbody Purse" />
        <BaseItemCard condition="Great Condition" :isAddedToCard="true" img="/img/temp/itemProduct.webp" price="£1,200" name="Dasein Women Handbags Top Handle Satchel Purse Shoulder Bag Hobo Bag Work Bag Set 2pcs" shortName="Vera Bradley Cotton Frannie Crescent Crossbody Purse" />
        <BaseItemCard condition="Great Condition" :isBookmarked="true" img="/img/temp/itemProduct.webp" price="£1,200" name="Dasein Women Handbags Top Handle Satchel Purse Shoulder Bag Hobo Bag Work Bag Set 2pcs" shortName="Vera Bradley Cotton Frannie Crescent Crossbody Purse" />
        <BaseItemCard condition="Great Condition" :showShortName="true" img="/img/temp/itemProduct.webp" price="£1,200" name="Dasein Women Handbags Top Handle Satchel Purse Shoulder Bag Hobo Bag Work Bag Set 2pcs" shortName="Vera Bradley Cotton Frannie Crescent Crossbody Purse" />
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Modal</h1>
    <div class="my-10 flex gap-10 flex-wrap bg-t1">
      <div class="[&>*]:m-6 w-1/2">
        <BaseModal type="left" buttonType="confirm" title="Blog post published" desc="This blog post has been published. Team members will be able to edit this post and republish changes."  />
        <BaseModal type="center" buttonType="delete" title="Blog post published" desc="This blog post has been published. Team members will be able to edit this post and republish changes."  />
        <BaseModal type="horizontal" buttonType="confirm"  title="Blog post published" desc="This blog post has been published. Team members will be able to edit this post and republish changes."  />
      </div>
    </div>

    <h1 class="underline text-2xl my-10">Segmented Button</h1>
    <div class="my-10 flex gap-10 flex-wrap">
      <div class="[&>*]:m-6 w-1/2">
        <BaseSegmentedButton v-model="segmentedButton" name="123" :options="segmentedButtonData" />
      </div>
      <div class="[&>*]:m-6 w-1/2">
      </div>
    </div>
    <h1 class="underline text-2xl my-10">Slider</h1>
    <div class="my-10 flex gap-10 flex-wrap bg-t1">
      <div class="[&>*]:m-6 w-1/2">
        <BaseSlider />
        <BaseSlider />
        <BaseSlider />
      </div>
    </div>
    <!-- <h1 class="underline text-2xl my-10">Calendar</h1>
    <div class="my-10 flex gap-10 flex-wrap bg-t1">
      <div class="[&>*]:m-6 w-1/2">
        <BaseCalendar />
        <BaseCalendar />
        <BaseCalendar />
      </div>
    </div> -->
  </div>
</template>

<script setup>
useHead({
  title: "UI KIT"
})
const dropdownOptions = [
  { id: 0, text: "option1", value: 1 },
  { id: 1, text: "option2", value: 2 },
  { id: 2, text: "option3", value: 3 },
];
const breadcrumbDataArray = [
  { id: 0, text: "option1" },
  { id: 1, text: "option2" },
  { id: 2, text: "option3" },
  { id: 3, text: "option4" },
  { id: 4, text: "option5" },
];
const breadcrumbData2Array = [
  { id: 0, text: "option1", icon: 'IconSetting' },
  { id: 1, text: "option2", icon: 'IconSetting' },
  { id: 2, text: "option3", icon: 'IconSetting' },
  { id: 3, text: "option4", icon: 'IconSetting' },
  { id: 4, text: "option5", icon: 'IconSetting' },
];
const tableHeaders = [
  { id: 0, name:'item', label: 'Items', hasSort: true },
  { id: 1, name:'date', label: 'Date', hasSort: true },
  { id: 2, name:'email', label: 'Email Address' },
  { id: 3, name:'price', label: 'Price' },
  { id: 4, name:'actions', label: '' },
]
const tableData = [
  { id: 0, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 1, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 2, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 3, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 4, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 5, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 6, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 7, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 8, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
  { id: 9, item: { img: '/img/temp/image-1.webp', text: 'Tim Jenings' }, date: { text: 'July 14, 2015' }, email: { text: 'tim.jennings@example.com' }, price: { text: 'Organizer' }, actions: { button: 'See Profile' } },
]
const tabData = [
  { id: 0, text: 'Tab' },
  { id: 1, text: 'Tab' },
  { id: 2, text: 'Tab' },
]
const tabData2 = [
  { id: 0, text: 'Tab', icon: 'IconSetting' },
  { id: 1, text: 'Tab', icon: 'IconSetting' },
  { id: 2, text: 'Tab', icon: 'IconSetting' },
]
const tabData3 = [
  { id: 0, icon: 'IconSetting' },
  { id: 1, icon: 'IconSetting' },
  { id: 2, icon: 'IconSetting' },
]
const stepperData = [
  { id: 0, text: '' },
  { id: 1, text: '' },
  { id: 2, text: '' }
]
const stepperData2 = [
  { id: 0, text: 'Title' },
  { id: 1, text: 'Title' },
  { id: 2, text: 'Title' },
  { id: 3, text: 'Title' }
]
const segmentedButtonData = [
  { id: 0, text: 'Title', value: '0' },
  { id: 1, text: 'Title', value: '1' },
  { id: 2, text: 'Title', value: '2' },
  { id: 3, text: 'Title', value: '3' }
]
const segmentedButton = ref('0')
</script>
