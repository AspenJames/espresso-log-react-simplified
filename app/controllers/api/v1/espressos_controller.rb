module Api 
  module V1
    class EspressosController < ApplicationController
      def index
        render :json => Origin.find(params[:origin_id]).espressos
      end

      def create
        origin = Origin.find(params[:origin_id])
        e = origin.espressos.build(espresso_params)
        if e.save
          render :json => e
        else
          render :json => {"errors": e.errors.full_messages}
        end
      end

      def destroy
        esp = Espresso.find(params[:id])
        esp.destroy
        render :json => {"destroy": esp}
      end

      def update
        origin = Origin.find(params[:originId])
        coffee_shop = CoffeeShop.find(params[:coffeeShopId])
        espresso = origin.espressos.find(params[:espresso][:id])

        if espresso.coffee_shop = coffee_shop
          espresso.update(espresso_params)
          render :json => {"updated": espresso}
        else
          render :json => {"unauthorized": "You may not edit another coffee shop's espresso recipes."}
        end
      end

      private
      def espresso_params
        params.require(:espresso).permit(:dose, :yield, :time, :notes, :days_off_roast)
      end
    end
  end
end
